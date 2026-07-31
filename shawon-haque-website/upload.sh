#!/bin/bash
REPO="simon141404-gif/guardian-family-app"
TOKEN="$GITHUB_TOKEN"

upload_file() {
  local file=$1
  local path="shawon-haque-website/$file"
  local content=$(base64 -w 0 "$file")
  
  local sha=""
  local exists=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $TOKEN" "https://api.github.com/repos/$REPO/contents/$path")
  
  if [ "$exists" = "200" ]; then
    sha=$(curl -s -H "Authorization: token $TOKEN" "https://api.github.com/repos/$REPO/contents/$path" | python3 -c "import sys,json; print(json.load(sys.stdin).get('sha',''))")
  fi
  
  local data="{\"message\":\"Add shawon-haque/$file\",\"content\":\"$content\""
  [ -n "$sha" ] && data="$data,\"sha\":\"$sha\""
  data="$data}"
  
  result=$(curl -s -X PUT -H "Authorization: token $TOKEN" -H "Content-Type: application/json" -d "$data" "https://api.github.com/repos/$REPO/contents/$path")
  echo "$result" | python3 -c "import sys,json; d=json.load(sys.stdin); print('✓ ' + path if 'content' in d else '✗ ' + d.get('message','')[:40])"
}

export -f upload_file

find . -type f ! -path './node_modules/*' ! -path './.git/*' ! -path './.next/*' ! -path './package-lock.json' | while read f; do
  upload_file "$f"
done
