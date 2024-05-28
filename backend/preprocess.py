from pymilvus import (
    connections, utility, DataType, FieldSchema, CollectionSchema, Collection, Partition
)
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from unqlite import UnQLite
import numpy as np
import pickle
import gdown
import json

NUM_RECORD = 2000
EMBEDDING_LEN = 2048
FLOOR, CEILING, MAX_LAYER = 2, 12, 2

def retrive_data():
    db, data = UnQLite("audio.db"), []

    with db.cursor() as cursor:
        for key, value in cursor:
            record = pickle.loads(value)
            data.append({
                "filename": key,
                "partition": "",
                "embedding": pickle.loads(record["embedding"]).tolist() # 2048
            })
    return data

def clustering(data, indices, layer):
    if layer > MAX_LAYER:
        return

    k, max_score = 0, 0
    X = [data[idx]["embedding"] for idx in indices]

    for n in range(FLOOR, CEILING):
        kmeans = KMeans(n_clusters=n, random_state=0, n_init="auto").fit(X)
        score = silhouette_score(X, kmeans.labels_)
        if max_score < score:
            k = n
            max_score = score

    kmeans = KMeans(n_clusters=k, random_state=0, n_init="auto").fit(X)
    indices_list = [[] for _ in range(k)]
    for j, label in enumerate(kmeans.labels_.tolist()):
        idx = indices[j]
        indices_list[label].append(idx)
        data[idx]["partition"] += f"{str(label)}_"

    centroids = []
    for indices in indices_list:
        centroids.append({
            "embedding": (np.mean([data[idx]["embedding"] for idx in indices], axis=0)).tolist(),
            "nexts": clustering(data, indices, layer + 1)
        })
    return centroids

def upload(data):
    connections.connect(db_name='default', host='140.112.28.129', port='19530')

    schema = CollectionSchema(fields=[
        FieldSchema(name='filename', dtype=DataType.VARCHAR, is_primary=True, max_length=128),
        # FieldSchema(name='partition', dtype=DataType.VARCHAR, max_length=128),
        FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, dim=EMBEDDING_LEN),
    ], auto_id=False)

    utility.drop_collection('audio')
    collection = Collection(
        name='audio',
        schema=schema,
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

    partition_list = {"default": Partition(collection=collection, name="default", description="default")}
    for da in data:
        if da["partition"] not in partition_list:
            partition_list[da["partition"]] = Partition(collection=collection, name=da["partition"], description=da["partition"])
        partition_list[da["partition"]].insert({"filename": da["filename"], "embedding": da["embedding"]})
        partition_list["default"].insert({"filename": da["filename"], "embedding": da["embedding"]})    # debug

if __name__ == "__main__":
    gdown.download(id="1oEQijUkn5QerZ3UvaJ1a5N6G7mbDpjeG", output="audio.db")
    data = retrive_data()
    centroids = clustering(data, range(NUM_RECORD), 1)
    with open("centroids.json", "w+") as jsonfile:
        json.dump(centroids, jsonfile, indent=4)
    upload(data)