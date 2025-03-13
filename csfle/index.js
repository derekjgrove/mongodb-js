const mongodb = require("mongodb");
const { MongoClient, Binary, ClientEncryption } = mongodb;
// const ClientEncryption = require("mongodb-client-encryption")
const masterPojo = require("./masterPojo")

var db = "test";
var coll = "test";
var namespace = `${db}.${coll}`;
// start-kmsproviders
const fs = require("fs");
const { update, projection, find_100, agg } = require("./dao");
const provider = "local";
const path = "./master-key.txt";
const localMasterKey = fs.readFileSync(path);

console.log(localMasterKey)
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};
// end-kmsproviders
const connectionString = "<>";

// start-key-vault
const keyVaultNamespace = "__encryption.__keyVault_2";
// end-key-vault


var masterSchema = {};
masterSchema[namespace] = masterPojo.schema;

const extraOptions = {
    mongocryptdSpawnArgs: ["--port", "30000"],
    mongocryptdURI: 'mongodb://localhost:30000',
    // cryptSharedLibPath: "C:/Program Files/MongoDB/Server/7.0/bin/mongocryptd",
    cryptSharedLibRequired: true
};

// start-client
const secureClient = new MongoClient(connectionString, {
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    // schemaMap: masterSchema,
    bypassAutoEncryption: true,
    // extraOptions: extraOptions,
  },
});




// end-client
const regularClient = new MongoClient(connectionString, {
});

const encryption = new ClientEncryption(regularClient, {
  keyVaultNamespace,
  kmsProviders,
});


async function updateData () {
  try {
    await regularClient.connect();
    try {
      await secureClient.connect();
      // start-insert
      try {
        const writeResult = await secureClient
          .db(db)
          .collection(coll)
          .updateOne({_id: new mongodb.ObjectId('63a205725e4dc9275898f7c9')}, update);
      } catch (writeError) {
        console.error("writeError occurred:", writeError);
      }
      // end-find
    } finally {
      await secureClient.close();
    }
  } finally {
    await regularClient.close();
  }
}

async function updateData_app () {
  try {
    await regularClient.connect();
    try {
      await secureClient.connect();
      // start-insert
      try {
        const writeResult = await secureClient
          .db(db)
          .collection(coll)
          .updateOne({_id: new mongodb.ObjectId('638f9b4753f39dae4b2f7ec4')}, update);
      } catch (writeError) {
        console.error("writeError occurred:", writeError);
      }
      // end-find
    } finally {
      await secureClient.close();
    }
  } finally {
    await regularClient.close();
  }
}

async function findEx() {
  try {
    await regularClient.connect();
    try {
      await secureClient.connect();
      // start-insert
      console.log("Finding a document with regular (non-encrypted) client.");
      console.log(
        await regularClient.db(db).collection(coll).findOne({_id: new mongodb.ObjectId('63a205725e4dc9275898f7c9')}, projection)
      );

      console.log(
        "Finding a document with encrypted client, searching on an encrypted field"
      );
      // queryEncryptedName = await encryption.encrypt("Greg", {
      //   algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
      //   keyId: dataKeyId,
      // });
      console.log(
        await secureClient.db(db).collection(coll).findOne(find_100, projection)
      );
      // end-find
    } finally {
      await secureClient.close();
    }
  } finally {
    await regularClient.close();
  }
}

async function aggEx() {
  try {
    await regularClient.connect();
    try {
      await secureClient.connect();
      var clientEncryption = await secureClient.db(db).ClientEncryption
      // start-insert
      console.log("Finding a document with regular (non-encrypted) client.");
      console.dir(
        await regularClient.db(db).collection(coll).aggregate(await agg(encryption)).toArray(),
        { depth: null }
      );

      console.log(
        "Finding a document with encrypted client, searching on an encrypted field"
      );
      
      console.dir(
        await secureClient.db(db).collection(coll).aggregate(await agg(encryption)).toArray(),
        { depth: null }
      );
      // end-find
    } finally {
      await secureClient.close();
    }
  } finally {
    await regularClient.close();
  }
}


async function test() {
  try {
    await regularClient.connect();
    try {
      await secureClient.connect();
      // start-insert
      console.log("Finding a document with regular (non-encrypted) client.");
      console.log(
        await regularClient.db(db).collection(coll).findOne(find_100, projection)
      );

      console.log(
        "Finding a document with encrypted client, searching on an encrypted field"
      );
        var doc = await secureClient.db(db).collection(coll).findOne(find_100)
        await secureClient.db(db).collection(coll+"_1").insertOne(doc)
      
      // end-find
    } finally {
      await secureClient.close();
    }
  } finally {
    await regularClient.close();
  }
}



aggEx();