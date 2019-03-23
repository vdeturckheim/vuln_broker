'use strict';
const MongoClient = require('mongodb').MongoClient;
const Semver = require('semver');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/vulns2';

const client = new MongoClient(url);
let collection;
const init = async function () {

    if (collection) {
        return collection;
    }
    await client.connect();
    const db = client.db();
    collection = db.collection('vulns');
    return collection;
};

module.exports.getVulnCore = async function (version) {

    return [];
};

const getVulnFor = async function (name, version) {

    const collection = await init();
    return (await collection.findOne({ name }))
        .vulns
        .filter((x) => Semver.satisfies(version, x.vulnerable_versions));
};

module.exports.getVulnsEcosystem = async function (query) {

    const res = [];
    for (const { name, version } of query) {

        const data = await getVulnFor(name, version);
        if (data) {
            res.push(data);
        }
    }

    return res;
};
