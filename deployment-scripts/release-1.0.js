client = Mongo('mongodb+srv://daragies:daragies@mongo-content-env-stg.dvbfw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = client.getDB('db-content-services')

db.getCollection('channels').find({_id: 'channel:mcp:callsign:Z002'})
