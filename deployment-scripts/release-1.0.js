client = connect("cluster0.xzkla.mongodb.net/admin", "testUser ", "testUser ")
db = client.getDB('sample_training')

printjson(db.getCollection('companies').find({name: 'Wetpaint'}))
db.getCollection('companies').find({name: 'Wetpaint'})