#!/bin/bash

# Schritt 1:
echo "Build local frontend..."
pnpm build-only

# Schritt 2:
echo "Connect to Raspberry Pi and delete the folder /var/www/html/*..."
ssh pi@fotobox.local 'sudo rm -rf /var/www/html/*'

# Schritt 3:
echo "Copy ./dist/* to the Raspberry Pi..."
scp -r ./dist/* pi@fotobox.local:/var/www/html/

echo "Done! Frontend has been successfully deployed to the Raspberry Pi."
