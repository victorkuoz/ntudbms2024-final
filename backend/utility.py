
import random
import pickle
import json
import numpy as np
import soundfile as sf
from unqlite import UnQLite
from pymilvus import connections, Collection, Partition
from panns_inference import AudioTagging
from sklearn.metrics.pairwise import cosine_similarity

# milvus
conn = connections.connect(db_name='default', host='140.112.28.129', port='19530')
audio_collection = Collection("audio")

# model
audio_model = AudioTagging(checkpoint_path=None, device="cpu")

# database
db = UnQLite("audio.db")
centroids = json.load(open("centroids.json"))

def audio_embedding(content_list):    # 2048
    _, embedding_list = audio_model.inference(np.array(content_list))
    return embedding_list

def get_partition(embedding, centroids):
    max_idx, max_score = 0, 0
    for idx, centroid in enumerate(centroids):
        score = cosine_similarity([embedding],[centroid["embedding"]])
        if score > max_score:
            max_score = score
            max_idx = idx

    partition = f"{max_idx}_"
    if centroids[max_idx]["nexts"] != None:
        partition += get_partition(embedding, centroids[max_idx]["nexts"])

    return partition

def audio_embedding_search(embedding, partition_name="default"):
    print(partition_name)
    audio_partition = Partition(collection=audio_collection, name=partition_name)
    cnt = audio_partition.load()
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