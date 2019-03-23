#!/usr/bin/env bash
mkdir ./tmp
cd ./tmp
git clone git@github.com:nodejs/security-advisories.git
cd ..
node update.js
#rm -rf ./tmp
