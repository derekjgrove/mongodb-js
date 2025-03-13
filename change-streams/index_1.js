const { MongoClient } = require("mongodb");


// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<>";
const client = new MongoClient(uri);

// Declare a variable to hold the change stream
let changeStream;

// Define an asynchronous function to manage the change stream
async function run() {

        const sourceDatabase = client.db("sample_training");
        const sourceCollection = sourceDatabase.collection("companies");


        // Open a Change Stream on the "haikus" collection
        changeStream = sourceCollection.watch([], { fullDocument: 'whenAvailable', fullDocumentBeforeChange: "whenAvailable" });

        // Print change events as they occur
        // for await (const change of changeStream) {
        changeStream.on('change', (change) => {
            // console.log("Received change:\n", change);

            // # Implement support for inserts, updates, deletes
            switch (change.operationType) {
                case "insert": {
                    console.log("insert");
                    // await changesCollection.insertOne(change.fullDocument);
                    break;
                }
                case "update": {
                    console.log("update");
                    // await changesCollection.replaceOne(change.documentKey, change.fullDocument, { "upsert": true });
                    console.dir(change, { depth: null })
                    break;
                }
                case "delete": {
                    console.log("delete");
                    // await changesCollection.deleteOne(change.documentKey);
                    break;
                }
                case "replace": {
                    console.log("replace");
                    console.dir(change, { depth: null })
                    break;
                }
                default: {
                    console.log("default / unhandled");
                    break;
                }
            }

            // Close the change stream when done
            // await changeStream.close();
        

    });

}

run().catch(console.dir);
