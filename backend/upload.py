import time
import string
import pickle
import numpy as np
from unqlite import UnQLite
from pymilvus import (
    connections, utility, DataType, FieldSchema, CollectionSchema, Collection, Index
)

def retrive():
    data = []
    db = UnQLite("audio.db")

    with db.cursor() as cursor:
        for key, value in cursor:
            record = pickle.loads(value)
            data.append({
                'filename': key,
                'category': record['category'],
                'text_embedding': pickle.loads(record['text_embedding']),   # 768
                'audio_embedding': pickle.loads(record['audio_embedding']).tolist() # 2048
            })
    return data

def store(data):
    connections.connect(alias='default', db_name='default', host='140.112.28.129', port='19530')

    fields = [
        FieldSchema(name='filename', dtype=DataType.VARCHAR, is_primary=True, max_length=64),
        FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, dim=2048),
    ]

    schema = CollectionSchema(fields=fields, auto_id=False)

    utility.drop_collection('audio')
    collection = Collection(
        name='audio',
        schema=schema,
        using='default',
        shard_num=2,    # todo
        consistency_level='Strong'
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

    result = collection.insert(data=[{'filename': d['filename'], 'embedding': d['audio_embedding']} for d in data])

if __name__ == '__main__':
    data = retrive()
    store(data)