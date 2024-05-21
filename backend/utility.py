
import random
import numpy as np
import soundfile as sf
from pymilvus import connections, Collection
from panns_inference import AudioTagging

# milvus
conn = connections.connect(alias='default', db_name='default', host='140.112.28.129', port='19530')
audio_collection = Collection("audio")
audio_collection.load()

# model
audio_model = AudioTagging(checkpoint_path=None, device="cpu")

def audio_embedding(content_list):    # 2048
    _, embedding_list = audio_model.inference(np.array(content_list))
    return embedding_list

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
        "filename": hit.id,
        "distance": hit.distance
    } for hit in hits]