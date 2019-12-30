#!/bin/bash

exec 2>/dev/null

cd /home/ctf

npm install
node app.js
