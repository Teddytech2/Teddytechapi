#!/bin/sh
# Revive the TEDDY-TECH API console on the preview port.
cd /workspace/teddy-api || exit 1
if [ ! -d node_modules/express ]; then
  npm install --omit=dev >/tmp/teddy-install.log 2>&1 || exit 1
fi
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/health; then
  exit 0
fi
PORT=8080 node index.js >/tmp/teddy-api.log 2>&1 &
exit 0
