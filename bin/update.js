'use strict';
const Util = require('util');
const Fs = require('fs');
const Glob = Util.promisify(require('glob'));
const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/vulns2';

const client = new MongoClient(url);

const main = async function () {

    await client.connect();
    const db = client.db();
    const collection = db.collection('vulns');
    const fileList = await Glob('./tmp/security-advisories/ecosystem/*/');
    for (const dir of fileList) {
        const vulns = (await Glob('*.json', { cwd: dir, absolute: true}))
            .map((x) =>  Fs.readFileSync(x))
            .map((x) => JSON.parse(x));
        const name = vulns[0].module_name;
        await collection.findOneAndUpdate({ name },
            { $set: { name, vulns } },
            { upsert: true });
    }
    await client.close(true);
};

main();



