
import random
import pickle
import numpy as np
import soundfile as sf
from scipy import spatial
from unqlite import UnQLite
from pymilvus import connections, Collection, Partition
from panns_inference import AudioTagging

# milvus
conn = connections.connect(db_name='default', host='140.112.28.129', port='19530')
audio_collection = Collection("audio")

# model
audio_model = AudioTagging(checkpoint_path=None, device="cpu")

# database
db = UnQLite("audio.db")

def audio_embedding(content_list):    # 2048
    _, embedding_list = audio_model.inference(np.array(content_list))
    return embedding_list

def audio_embedding_search(embedding, partition_name="default"):
    audio_partition = Partition(collection=audio_collection, name=partition_name)
    audio_partition.load()
    hits = audio_partition.search(
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
        output_fields=["embedding"],
    )[0]

    # for hit in hits:
    #     print(hit)

    audio_partition.release()
    return [{
        "filename": hit.id,
        "distance": hit.distance,
        # "embedding": hit.get("embedding")
    } for hit in hits]
    