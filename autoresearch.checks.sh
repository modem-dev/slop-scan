#!/usr/bin/env bash
set -euo pipefail

tmp_output=$(mktemp)
cleanup() {
  rm -f "$tmp_output"
}
trap cleanup EXIT

if ! bun test >"$tmp_output" 2>&1; then
  tail -80 "$tmp_output"
  exit 1
fi

if ! bun run build >"$tmp_output" 2>&1; then
  tail -80 "$tmp_output"
  exit 1
fi
