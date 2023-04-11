#!/bin/bash

# Schritt 1: Lokales Frontend bauen
echo "Baue lokales Frontend..."
pnpm build-only

# Schritt 2: SSH-Verbindung zum Raspberry Pi aufbauen und den Ordner /var/www/html/* löschen
echo "Verbinde mit Raspberry Pi und lösche den Ordner /var/www/html/*..."
ssh pi@fotobox.local 'sudo rm -rf /var/www/html/*'

# Schritt 3: Den lokalen Ordner ./dist/* auf den Raspberry Pi in den Ordner /var/www/html/ kopieren
echo "Kopiere ./dist/* auf den Raspberry Pi..."
scp -r ./dist/* pi@fotobox.local:/var/www/html/

echo "Fertig! Frontend wurde erfolgreich auf den Raspberry Pi deployed."
