'use strict';
const Semver = require('semver');
const Boom = require('boom');
const { Router } = require('express');

const Service = require('./services');

const router = Router();

router.get('/core/:version', (req, res, next) => {

    const { version } = req.params;
    if (!Semver.valid(version)) {
        return next(Boom.badRequest(`${version} is not valid semver`));
    }

    return Service
        .getVulnCore(version)
        .then((vulns) => res.json(vulns))
        .catch((e) => next(e));
});

const validQuery = function (query) {

    if (!Array.isArray(query)) {
        return Boom.badRequest(`query is not an array`);
    }

    const bad = query.find(({ name, version }) => {

        return !(typeof name === 'string' && name.length > 0 && Semver.valid(version))
    });
    if (bad) {
        return Boom.badRequest(`${JSON.stringify(bad)} is not a valid part of query`);
    }
    return null;
};

router.post('/ecosystem', (req, res, next) => {

    const query = req.body;

    const validErr = validQuery(query);
    if (validErr) {
        return next(validErr);
    }
    return Service
        .getVulnsEcosystem(query)
        .then((vulns) => res.json(vulns))
        .catch((e) => next(e));
});

module.exports = router;
