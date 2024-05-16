from unqlite import UnQLite
import pickle
from datasets import load_dataset

class EmbedDB():
    def __init__(self, name):
        self.db = UnQLite(name)

    def store_audio(self, file_name, category, text_embedding, audio_embedding):
        record = {
            'category': category, 
            'text_embedding': pickle.dumps(text_embedding),
            'audio_embedding': pickle.dumps(audio_embedding),
        }

        serialized_record = pickle.dumps(record)

        # Store in the database
        self.db[file_name] = serialized_record

    def retrieve_audio(self, file_name):
        # Retrieve the serialized record from the database
        serialized_record = self.db[file_name]
        
        # Deserialize the record
        record = pickle.loads(serialized_record)

        # Extract and deserialize each component
        category = record['category']
        text_embedding = pickle.loads(record['text_embedding'])
        audio_embedding = pickle.loads(record['audio_embedding'])
        
        return {
            'category': category, 
            'text_embedding': text_embedding,
            'audio_embedding': audio_embedding,
        }

    def list_filenames(self):
        files = []
        for key in self.db.keys():
            files.append(key)
        return files
    
    def db_commit(self):
        self.db.commit()

embed_db = EmbedDB("my_embedding.db")

if __name__ == "__main__":

    audio_dataset = load_dataset("ashraq/esc50", split="train")

    files = embed_db.list_filenames()
    print(files[0])

    r = embed_db.retrieve_audio(files[0])
    print(r["text_embedding"])
    print(r["audio_embedding"])