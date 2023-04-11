#!/bin/bash

# Schritt 1:git update
echo "Update sourcecode..."
ssh pi@fotobox.local 'cd /var/www/backend/photobooth/packages/nest-backend && git pull'

# Schritt 2:Baue Backend
echo "Baue Backend..."
ssh pi@fotobox.local 'source ~/.bashrc; source ~/.nvm/nvm.sh; nvm use 16; cd /var/www/backend/photobooth/packages/nest-backend && /home/pi/.nvm/versions/node/v16.20.0/bin/pnpm build'

echo "Fertig! Backend wurde erfolgreich auf den Raspberry Pi deployed."
