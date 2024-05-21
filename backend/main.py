import time
import string
import random
import numpy as np

print("=== importing package ===")
from pymilvus import (
    connections, utility, DataType, FieldSchema, CollectionSchema, Collection, Index
)

# args
host = '140.112.28.129'
port = '19530'
dim = 8 # todo

# connet to Milvus server
connections.connect(alias='default', db_name='default', host=host, port=port)

# create field schema
fields = [
    FieldSchema(name='id', dtype=DataType.VARCHAR, is_primary=True, max_length=128),
    FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, dim=dim),
    FieldSchema(name='metadata', dtype=DataType.VARCHAR, max_length=128)
]

# create collection schema
schema = CollectionSchema(
    fields=fields,
    auto_id=False,
    enable_dynamic_field=False,  # $meta
)

# create collection
utility.drop_collection('bts')
collection = Collection(
    name='bts',
    schema=schema,
    using='default',
    shard_num=2,    # todo
    consistency_level='Strong'
)

# insert data
def generate_random_string(length):
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))

def generate_random_entities(num_entities, dim):
    entities = []
    for _ in range(num_entities):
        id = generate_random_string(10)  # generate a random id string of length 128
        metadata = generate_random_string(10)  # generate a random metadata string of length 128
        embedding = np.random.rand(dim).tolist()  # denerate a random float vector with dimension 'dim'
        entities.append({'id': id, 'embedding': embedding, "metadata": metadata})
    return entities

entities = generate_random_entities(3000, dim)
result = collection.insert(data=entities)

# create index
collection.create_index(
    field_name='id'
)

collection.create_index(
    field_name='embedding',
    index_params={
        'index_type': 'IVF_FLAT',
        'metric_type': 'COSINE',
        'params': {
            'nlist': 128
        }
    },
    timeout=None
)

# load data into memory for later search
collection.load()

# vector similarity search
start_time = time.time()
result = collection.search(
    data=[np.random.rand(dim).tolist()],
    anns_field='embedding',
    param={
        'metric_type': 'COSINE',
        'params': {
            'nprobe': 10,
            'offset': 10,
            'radius': 0.2,
            'range_filter': 1.0
        }
    },
    limit=10,
    output_fields=['metadata'],
    # partition_names=[],
)
end_time = time.time()

for hits in result:
    for hit in hits:
        print(f"hit: {hit}")

print(f'search latency = {(end_time - start_time):.4f}s')

# release data from memory
collection.release()

# drop collection
collection.drop()

# disconnect
connections.disconnect(alias='default')
