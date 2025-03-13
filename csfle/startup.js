//DataKeyId [base64]:  cswbfeZMSV+WwmxMfM0elw==

const mongodb = require("mongodb");
const { MongoClient,ClientEncryption  } = mongodb;
// const { ClientEncryption } = require("mongodb-client-encryption")



// start-local-cmk
const fs = require("fs");
const crypto = require("crypto");
// try {
//   fs.writeFileSync("master-key.txt", crypto.randomBytes(96));
// } catch (err) {
//   console.error(err);
// }
// end-local-cmk

// start-kmsproviders
const provider = "local";
const path = "./master-key.txt";
const localMasterKey = fs.readFileSync(path);
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};
// end-kmsproviders

// start-datakeyopts
// end-datakeyopts

async function main() {
  // start-create-index
  const uri = "<>";
  const keyVaultDatabase = "__encryption";
  const keyVaultCollection = "__keyVault_2";
  const keyVaultNamespace = `${keyVaultDatabase}.${keyVaultCollection}`;
  const keyVaultClient = new MongoClient(uri);
  await keyVaultClient.connect();
  const keyVaultDB = keyVaultClient.db(keyVaultDatabase);
  const keyVaultColl = keyVaultDB.collection(keyVaultCollection);
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    }
  );
  // end-create-index

  // start-create-dek
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  const encryption = new ClientEncryption(client, {
    keyVaultNamespace,
    kmsProviders,
  });
  const key = await encryption.createDataKey(provider, {
    keyAltNames: ["demo-data-key"],
  });
  console.log("DataKeyId [base64]: ", key.toString("base64"));
  await keyVaultClient.close();
  await client.close();
  // end-create-dek
}
main();