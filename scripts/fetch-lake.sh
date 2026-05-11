#!/usr/bin/env bash
set -euo pipefail
OUT="scripts/starnbergersee.overpass.json"
curl -s -X POST 'https://overpass-api.de/api/interpreter' \
  --data-urlencode 'data=[out:json][timeout:60];
rel["name"="Starnberger See"]["natural"="water"];
out geom;' > "$OUT"
echo "Wrote $(wc -c < "$OUT") bytes to $OUT"
echo "Members:"
node -e "const d=require('fs').readFileSync('$OUT','utf8');const j=JSON.parse(d);const r=j.elements[0];console.log('type=',r?.type,'tags=',r?.tags?.name,'members=',r?.members?.length);"
