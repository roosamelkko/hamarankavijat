#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TOKENS_CSS="$REPO_ROOT/assets/css/tokens.css"
TOKENS_TXT="$REPO_ROOT/design-tokens.txt"

if [[ ! -f "$TOKENS_CSS" ]]; then
  echo "Missing token source: $TOKENS_CSS" >&2
  exit 1
fi

{
  cat <<'HEADER'
Hamarankavijat Design Tokens
===========================

Source of truth
- This file is auto-generated from assets/css/tokens.css.
- Run ./scripts/sync-design-tokens.sh after token changes.

CSS Variable Mirror
-------------------
HEADER

  awk '
    BEGIN { in_root = 0 }
    /^:root[[:space:]]*\{/ { in_root = 1 }
    {
      if (in_root) {
        print
      }
    }
    in_root && /^}/ { exit }
  ' "$TOKENS_CSS"
} > "$TOKENS_TXT"

echo "Updated $TOKENS_TXT from $TOKENS_CSS"
