#!/usr/bin/env bash

git checkout master
git pull
CURRENT=$(git rev-parse HEAD)
npm i
npm run build
git checkout gh-pages
cp -R dist/* .
git add .
git commit -m "deploy commit $CURRENT"
git push
