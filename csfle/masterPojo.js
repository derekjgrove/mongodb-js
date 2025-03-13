
const mongodb = require("mongodb");
const { Binary } = mongodb;


const dataKey = "<>";
const schema = {
    bsonType: "object",
    encryptMetadata: {
        keyId: [new Binary(Buffer.from(dataKey, "base64"), 4)],
    },
    properties: {
        employment: {
            bsonType: "object",
            properties: {
                payment: {
                    bsonType: "object",
                    properties: {
                        number: {
                            encrypt: {
                                bsonType: "int",
                                algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
                            },
                        },
                    }
                }
            },
        },
        // top-level field n
    },
};

exports.schema = schema