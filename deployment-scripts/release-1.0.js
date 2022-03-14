//to switch DBs - db = db.getSiblingDB('<db_name>')

//RUN UPDATE
//var updateRes = db.<db_name>.updateOne({_id: <ObjectId()>}, {$set: {}})

//VERIFY OPERATION
//print(updateRes)

//ASSERT LOGIC
//var updatedRecord = db.<db_name>.find({_id: <ObjectId_From_updatedRes>}).toArray()
//print('Record updated correctly ==> ' + (updatedRecord[0]['<updated_field>'] === 'expected_value'))

print('\n\n***************** Update Companies with new Required field - someNewField *****************')
var updateCompanies = db.companies.updateMany({someNewField: {$exists:false}}, {$set: {someNewField: 'some new text'}})

print(updateCompanies)

var totalCount = db.companies.count()
var updatedCompaniesCount = db.companies.count({someNewField: 'some new text'})
print ('Assert all records in companies have the new field --> ' + (totalCount == updatedCompaniesCount))

print('\n\n***************** Insert missing company *****************')
var insertCompanies = db.companies.insert({'foo': 'bar'})

print(insertCompanies)

