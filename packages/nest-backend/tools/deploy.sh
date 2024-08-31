#!/bin/bash

# Schritt 1:
echo "Update sourcecode..."
ssh pi@fotobox.local 'cd /var/www/backend/photobooth/packages/nest-backend && git pull'

# Schritt 2:
echo "Refresh dependencies..."
ssh pi@fotobox.local 'source ~/.bashrc; source ~/.nvm/nvm.sh; nvm use 18; cd /var/www/backend/photobooth/packages/nest-backend && /home/pi/.nvm/versions/node/v18.20.4/bin/pnpm install'

# Schritt 3:
echo "Build backend..."
ssh pi@fotobox.local 'source ~/.bashrc; source ~/.nvm/nvm.sh; nvm use 18; cd /var/www/backend/photobooth/packages/nest-backend && /home/pi/.nvm/versions/node/v18.20.4/bin/pnpm build'

echo "Finish! Backend was successfully deployed to the Raspberry Pi."
