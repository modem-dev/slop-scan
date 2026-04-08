#!/usr/bin/env bash
set -euo pipefail

bun run scripts/autoresearch-throughput.ts "$@"
