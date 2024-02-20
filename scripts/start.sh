#!/bin/bash

#TODO: Ajsutar para dar deploy localmente apos sls offline
cd /workspace/client/app && npm run preview &
cd /workspace/service/api && npm start
