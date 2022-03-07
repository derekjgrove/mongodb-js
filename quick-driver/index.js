const { MongoClient } = require('mongodb');

const URI = 'mongodb+srv://<USER>:<PASSWORD@<CLUSTER_VIP>/<DEFAULT_DB>?retryWrites=true&w=majority'
const DB_NAME = 'DB_NAME'
const COLLECTION_NAME = 'COLLECTION_NAME'

async function initMongoClient () {
    return await new MongoClient(URI, { useNewUrlParser: true }).connect();
}


async function main() {
    const start = Date.now()
    const client = await initMongoClient()
    var db = await client.db(DB_NAME)

    const query_start = Date.now()
    var cursor = await db.collection(COLLECTION_NAME).find({ })
    //var cursor_to_mem = await db.collection(COLLECTION_NAME).find({ }).toArray()
    const query_end = Date.now()

    const cursor_start = Date.now()
    while (await cursor.hasNext()) {
        var nextElem = await cursor.next()
    }
    const cursor_end = Date.now()

    await client.close()

    const end = Date.now()

    console.log('TOTAL TIME (ms): ', end-start)
    console.log('QUERY TIME (ms): ', query_end-query_start)
    // console.log('TRAVERSAL TIME (ms): ', cursor_end-cursor_start)
}

main()
