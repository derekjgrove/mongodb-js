//to switch DBs - db = db.getSiblingDB('<db_name>')

//RUN UPDATE
//var updateRes = db.<db_name>.updateOne({_id: <ObjectId()>}, {$set: {}})

//VERIFY OPERATION
//print(updateRes)

//ASSERT LOGIC
//var updatedRecord = db.<db_name>.find({_id: <ObjectId_From_updatedRes>}).toArray()
//print('Record updated correctly ==> ' + (updatedRecord[0]['<updated_field>'] === 'expected_value'))


print(db.companies.find({name: 'Wetpaint'}))