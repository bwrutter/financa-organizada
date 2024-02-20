#!/bin/bash

cd /workspace/scripts/ && ./deploy.sh &
cd /workspace/client/app && npm run preview &
cd /workspace/service/api && npm start
