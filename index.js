const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url)
.then((client) => {

    console.log('Connected Correctly to the server');

    const db = client.db(dbname);
    // const collection = db.collection('dishes');

    // collection.insertOne({
    //     "name": "Test1",
    //     "description": "test1"
    // }, (err, result) => {
    //     assert.equal(err, null);

    //     console.log("Inserted Successfully");
    //     console.log(result);

    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err, null);

    //         console.log('Found:\n');
    //         console.log(docs);

    //         db.dropCollection('dishes', (err, result) => {
    //             assert.equal(err, null);

    //             client.close();
    //         })
    //     });
    // });

    // Using dbOper to perform operations

    dbOper.insertDocument(db, { name: "Ayush", description: "Human"}, 'dishes')
    .then((result) => {
        console.log('Insert Document:\n', result);

        return dbOper.findDocuments(db, 'dishes');        
    })
    .then((docs) => {
        console.log('Found Documents: \n', docs);

        return dbOper.updateDocument(db, {name: "Ayush"}, { description: "Updated Description" }, 'dishes');
    })         
    .then((result) => {
        console.log('Updated document:\n', result);

        return dbOper.findDocuments(db, 'dishes');
    })        
    .then((docs) => {
        console.log('Found Documents: \n', docs);

        return db.dropCollection('dishes');
    })                
    .then((result) => {                        
        console.log('Dropped Collections: ', result);
        return client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));