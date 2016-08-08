#!/bin/bash

git add .
git commit -m 'Gitbook Auto Published'
git push origin master

cd _private
git add .
git commit -m 'Gitbook Auto Published'
git push origin master

cd ..
rm -rf _book
node_modules/.bin/gitbook build
cd _book
git init
git add .
git commit -m "Gitbook Auto Deployed"
git remote add origin git@git.coding.net:willin/leader.js.cool.git
git push -f origin master:coding-pages
