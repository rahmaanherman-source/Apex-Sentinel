#!/bin/bash

# ============================================================
# PRINCIPAL    : RAHMANN MANZAR EL HERMAN
# ENTITY       : Make It All Count LLC / Apex Global LLC
# PATENT       : USPTO Provisional #63/940,186
# PHONE        : 312-307-6355
# EMAIL        : rahmaanherman@icloud.com
# DOMAIN       : apexlifeglobal.com
# DATE         : 2026-06-28
# DESCRIPTION  : APEX SENTINEL — Package Script
# ============================================================

echo "============================================================"
echo "APEX SENTINEL - Firefox Extension Packaging"
echo "Version: 1.0.4"
echo "============================================================"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Output file name
OUTPUT_FILE="apex-sentinel-v1.0.4.zip"

# Files and directories to include
INCLUDE_FILES=(
  "manifest.json"
  "background.js"
  "popup/"
  "content/"
  "icons/"
  "LICENSE"
  "README.md"
  "EXTENSION_README.md"
)

# Remove existing package if it exists
if [ -f "$OUTPUT_FILE" ]; then
  echo "Removing existing package..."
  rm "$OUTPUT_FILE"
fi

# Create the zip package
echo "Creating package..."
zip -r "$OUTPUT_FILE" "${INCLUDE_FILES[@]}" \
  -x "*.git*" \
  -x "*.DS_Store" \
  -x "*__pycache__*" \
  -x "*.pyc" \
  -x "node_modules/*" \
  -x "package.sh"

# Check if packaging was successful
if [ $? -eq 0 ]; then
  echo ""
  echo "============================================================"
  echo "✓ Package created successfully: $OUTPUT_FILE"
  echo "============================================================"
  echo ""
  
  # Show package size
  ls -lh "$OUTPUT_FILE"
  
  echo ""
  echo "Next steps:"
  echo "1. Test the extension by loading it in Firefox (about:debugging)"
  echo "2. Submit to addons.mozilla.org (AMO) for review"
  echo "3. Once approved, it will be available for public installation"
  echo ""
  echo "GODSPEED."
else
  echo ""
  echo "✗ Error creating package"
  exit 1
fi
