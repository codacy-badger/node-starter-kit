---
to: <%= projectDirectory %>/scripts/pre-commit
---
#!/usr/bin/env bash
set -e

# clean out unwanted files/directories
rm -rf \
  *.log \
  coverage/ \
  tmp/

# run lint-staged
node_modules/.bin/lint-staged
