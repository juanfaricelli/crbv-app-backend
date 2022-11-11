const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const APP_ENVIRONMENT = 'local';
const NODE_ENV = 'local';

const APP_MONGODB_USER = 'mongoDBUser';
const APP_MONGODB_PASS = 'mongoDBUser';

const APP_MONGODB_DB_TEST = 'test';

const APP_MONGODB_DB_CRBV = 'crbv';
const APP_MONGODB_DB_CRBV_USERS = 'users';

const APP_MONGODB_DB_MONGODB_PLAYGROUND = 'mongodbVSCodePlaygroundDB';
const APP_MONGODB_DB_MONGODB_PLAYGROUND_SALES = 'sales';

const uri = `mongodb+srv://${APP_MONGODB_USER}:${APP_MONGODB_PASS}@cluster0.ecz6e3m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const db = client.db(APP_MONGODB_DB_CRBV);
client.connect(async (err) => {
  const collection = db.collection(APP_MONGODB_DB_CRBV_USERS);
  // perform actions on the collection object
  // const aggregation = [
  //   {
  //     $match: {
  //       date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: '$item',
  //       totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
  //     },
  //   },
  // ];
  // const findQuery = { date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') } }

  // const findResult = await collection.findOne(findQuery);
  // const agg = await collection.aggregate(aggregation).toArray();

  const findQuery = {
    _id: ObjectId('62f494752ac4d87eb5a87019'),
  }; 

  const findResult = await collection.findOne(findQuery);

  console.log(findResult);

  client.close();
});
