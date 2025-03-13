const mongodb = require("mongodb");

async function agg(encryption) {
    return [
    {
        $match: {
            _id: new mongodb.ObjectId('63a205725e4dc9275898f7c9')
        }
    },
]}


const update = {
    $set: {
        "number": 100000
    }
}

const find_100 = {
    "number": 100000
}

const projection = {
    projection: {
        "number": 1
    }
}

exports.update = update
exports.find_100 = find_100
exports.projection = projection
exports.agg = agg