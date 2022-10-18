const MongoClient = require("mongodb").MongoClient;

const empData = require("./data.json");

const Connection = 'mongodb://127.0.0.1:27017';

MongoClient.connect(Connection, async (err, db)=> {
    if (err) { 
        console.log('error while connectiong', err); 
        return
    }
    const database = db.db("Human_Resource");

    const dbcollection = database.collection("employee");

    console.log('connected to mongo database');

    const insertMany = await dbcollection.insertMany(empData);
    console.log(insertMany);

    const finding = await dbcollection.find().toArray();
    console.log(finding);

    const salaryFind = await dbcollection.find( {salary: {$gt: "30000"}}).toArray();
    console.log(salaryFind);

    const expmore = await dbcollection.find( {overallExp: {$gte: '2'}}).toArray();
    console.log(expmore);

    const andOp = await dbcollection.find( { yearGrad: {$gt: '2015'}, overallExp: {$gt: '1'}}).toArray();
    console.log(andOp);

    const updateSal = await dbcollection.updateMany({salary: {$gt: "70000"}},{$set: {salary: "65000"}});
    console.log(updateSal);

    const deleteY = await dbcollection.deleteMany({lastCompany: 'Y'});
    console.log(deleteY);
});