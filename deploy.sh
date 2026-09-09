#!/usr/bin/env bash
#
# Deploy Yearly Golf Trip.
#
#   ./deploy.sh "what changed"
#
# Bumps the ?v= cache-busting version on every page, runs a quick
# pre-flight check, commits and pushes. Netlify republishes on its
# own about 30 seconds later.
#
# The version bump is the whole point of this script: skip it and
# returning visitors keep running the JavaScript they cached last
# time, which looks fine to you and broken to them.

set -euo pipefail
cd "$(dirname "$0")"

MSG="${1:-}"
if [[ -z "$MSG" ]]; then
  echo "usage: ./deploy.sh \"commit message\"" >&2
  exit 1
fi

# ---------------------------------------------------------------
# 1. work out the current asset version — every page must agree
# ---------------------------------------------------------------
# (kept bash 3.2 compatible — that is what ships with macOS)
versions=$(grep -hoE '\?v=[0-9]+' ./*.html | sort -u)
count=$(printf '%s\n' "$versions" | grep -c . || true)

if [[ "$count" -ne 1 ]]; then
  echo "Pages disagree on the asset version:" >&2
  printf '  %s\n' "$versions" >&2
  echo "Make them match, then rerun." >&2
  exit 1
fi

cur="${versions#\?v=}"
next=$(( cur + 1 ))

# ---------------------------------------------------------------
# 2. pre-flight: every local file a page references must exist
# ---------------------------------------------------------------
missing=0
while IFS= read -r ref; do
  [[ "$ref" =~ ^(https?:|data:|mailto:|#|\$\{) ]] && continue
  file="${ref%%\?*}"; file="${file%%#*}"
  [[ -z "$file" ]] && continue
  if [[ ! -e "$file" ]]; then
    echo "  missing: $file" >&2
    missing=1
  fi
done < <(grep -hoE '(href|src)="[^"]+"' ./*.html | sed -E 's/^(href|src)="//; s/"$//' | sort -u)

if [[ $missing -eq 1 ]]; then
  echo "Pre-flight failed: a page points at a file that does not exist." >&2
  exit 1
fi

# ---------------------------------------------------------------
# 3. bump, commit, push
# ---------------------------------------------------------------
echo "Bumping assets v$cur -> v$next"
sed -i '' "s/?v=$cur\"/?v=$next\"/g" ./*.html

if git diff --quiet && git diff --cached --quiet && [[ -z "$(git status --porcelain)" ]]; then
  echo "Nothing to deploy." >&2
  exit 0
fi

git add -A
git commit -q -m "$MSG"
git push -q

echo
echo "Pushed: $(git log -1 --pretty='%h %s')"
echo "Netlify is republishing — live in about 30 seconds:"
echo "  https://yearlygolftrip.netlify.app"
