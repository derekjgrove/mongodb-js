const path = require('path');
const fs = require('fs');

const HEADERS = [
    'Content-Type: application/json',
    'Access-Control-Request-Headers: *' 
]

const METHOD = 'POST'

const ENDPOINT = 'http://localhost:8000/'

const DATA_DEF = {
    "dataSource": "<CLUSTER_NAME>"
}

const BASE_PATH_INPUT = './input'
const BASE_PATH_OUTPUT = './output'

function getInputFiles() {

    const dir = fs.opendirSync(BASE_PATH_INPUT)
    var file
    var files = []
    while ((file = dir.readSync()) !== null) {
        files.push(file.name)
    }
    dir.closeSync()

    return files
}


function createCurlRequests (filePath) {

    const file = require(`${BASE_PATH_INPUT}/${filePath}`)
    const write_path = `${BASE_PATH_OUTPUT}/${path.parse(filePath).name}_out.txt`
    
    for (var query of file) {
        var fields = null

        if( query && query['attr'] && query['attr'].ns) {
            fields = (query['attr'].ns)
            fields = fields.split('.')
        } else {
            continue
        }
    

        var isFind = query['attr'].command.filter === undefined ? false : true

        var stringBuilder = `curl --request ${METHOD} '${ENDPOINT}${isFind==true ? 'find' : 'aggregate'}'`
        for (var header of HEADERS) {
            stringBuilder += ` --header '${header}'`
        }        

        var dataOptions = { ...DATA_DEF, 
            collection: fields[1],
            query: isFind==true ? query['attr'].command.filter : query['attr'].command.pipeline,
            method: isFind==true ? 'find' : 'aggregate'
        }

        stringBuilder += ` --data-raw '${JSON.stringify(dataOptions)}'\n`

        fs.appendFileSync(write_path, stringBuilder);
    }

    return write_path
}

function main() {
    var func = process.argv[process.argv.length-1]

    console.log('******************* FINDING AVAILABLE INPUT FILES IN ./input *******************')
    var inputFiles = getInputFiles()
    console.log('Found : ', inputFiles)
    
    console.log(`******************* RUNNING - ${func} *******************`)
    for (var inputFilePath of inputFiles) {
        var iter = null
        switch (func) {
            case 'createCurlRequests' :
                iter = createCurlRequests(inputFilePath)
            default :
                iter = `Cannot find function - ${func}`
        }
        console.log('Written to : ', iter)
    }
}

main()
