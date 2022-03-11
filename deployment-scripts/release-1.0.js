client = connect("mongo-content-env-stg.dvbfw.mongodb.net/myFirstDatabase", "daragies", "daragies")
db = client.getDB('db-content-services')

printjson(db.getCollection('channels').find({_id: 'channel:mcp:callsign:Z002'}, {title: 1}))
db.getCollection('channels').find({_id: 'channel:mcp:callsign:Z002'}, {title: 1})