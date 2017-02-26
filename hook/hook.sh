#!/bin/bash
#forever start /home/angel/GameBets.git/hooks/hook.js
unset 'GIT_DIR'
cd /home/angel/GameBets
pwd
sudo forever stop src/server/app.js
git fetch origin && sudo git pull origin master
npm install && bower install
gulp build & sudo PORT=3000 NODE_ENV=build forever start ./src/server/app.js
exec git update-server-info
