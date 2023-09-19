#!/bin/bash

# Schritt 1: Lokales Frontend bauen
echo "Build local front end..."
pnpm build-only

# Schritt 2: SSH-Verbindung zum Raspberry Pi aufbauen und den Ordner /var/www/html/* löschen
echo "Connect to Raspberry Pi and delete the folder /var/www/html/*..."
ssh pi@fotobox.local 'sudo rm -rf /var/www/html/*'

# Schritt 3: Den lokalen Ordner ./dist/* auf den Raspberry Pi in den Ordner /var/www/html/ kopieren
echo "Copy ./dist/* to the Raspberry Pi..."
scp -r ./dist/* pi@fotobox.local:/var/www/html/

echo "Done! Frontend has been successfully deployed to the Raspberry Pi."
