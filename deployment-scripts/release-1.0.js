client = Mongo("mongodb://cluster0-shard-00-00.xzkla.mongodb.net:27017,cluster0-shard-00-01.xzkla.mongodb.net:27017,cluster0-shard-00-02.xzkla.mongodb.net:27017/?replicaSet=atlas-t3jo8a-shard-0", "testUser ", "testUser ")
db = client.getDB('sample_training')

printjson(db.getCollection('companies').find({name: 'Wetpaint'}))
db.getCollection('companies').find({name: 'Wetpaint'})