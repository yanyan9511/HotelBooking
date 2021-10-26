/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo customertracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/customertracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/customertracker scripts/init.mongo.js
 */

db.customers.remove({});

const customerDB = [
    {
       sn_id: 1, name: 'David', contact: '91415076', created: new Date('2018-08-15'),
    },
    {
       sn_id: 2, name: 'Amy', contact: '84249928', created: new Date('2018-08-15'),
    },
    {
       sn_id: 3, name: 'Christina', contact: '83426754', created: new Date('2018-08-15'),
    },
  ];

db.customers.insertMany(customerDB);
const count = db.customers.count();
print('Inserted', count, 'customers');

db.counters.remove({ _id: 'customers' });
db.counters.insert({ _id: 'customers', current: count });

db.customers.createIndex({ sn_id: 1 }, { unique: true });
db.customers.createIndex({ name: 1 });
db.customers.createIndex({ contact: 1 });
db.customers.createIndex({ created: 1 });