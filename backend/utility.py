
import random
from pymilvus import connections, Collection

conn = connections.connect(alias='default', db_name='default', host='140.112.28.129', port='19530')
audio_collection = Collection("audio")
audio_collection.load()

def audio_embedding(content):    # 2048
    return [random.uniform(-1, 1) for _ in range(2048)]

def audio_embedding_search(embedding):
    hits = audio_collection.search(
        data=[embedding],
        anns_field="embedding",
        param={
            'metric_type': 'COSINE',
            'params': {
                # 'nprobe': 10,
                # 'offset': 10,
                # 'radius': 0.2,
                # 'range_filter': 1.0
            }
        },
        limit=5,
        output_fields=[],
        # partition_names=[],
    )[0]

    for hit in hits:
        print(hit)

    return [{
        'filename': hit.id,
        'distance': hit.distance
    } for hit in hits]