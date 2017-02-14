#!/bin/bash

pushd $(dirname "${0}") > /dev/null
DIR=$(pwd -L)
popd > /dev/null

ACTION=$1

build() {
  git add .
  git commit -m 'Gitbook Auto Published'
  git push origin master
  git push coding master

  node_modules/.bin/gitbook build
  cd _book
  git add .
  git commit -m "Gitbook Auto Deployed"
  git push -f coding master:coding-pages
  git push -f origin master:gh-pages
}

clean() {
  git add .
  git commit -m 'Gitbook Auto Published'
  git push origin master
  git push coding master

  rm -rf _book
  node_modules/.bin/gitbook build
  cd _book
  git init
  git add .
  git commit -m "Gitbook Auto Deployed"
  git remote add origin git@github.com:js-cool/leader.js.cool.git
  git remote add coding git@git.coding.net:willin/leader.js.cool.git
  git push -f coding master:coding-pages
  git push -f origin master:gh-pages
}

case "$ACTION" in
  clean)
    clean
  ;;
  *)
    build
  ;;
esac