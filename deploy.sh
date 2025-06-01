#!/usr/bin/env sh

COMMIT_MSG=${1:-"Deploying to GitHub Pages"} # default message if none is provided

npm run build && ./node_modules/.bin/gh-pages -d dist -m "$COMMIT_MSG"