#!/bin/bash

# Schritt 1:
echo "Update sourcecode..."
ssh pi@fotobox.local 'cd /var/www/backend/photobooth/packages/nest-backend && git pull'

# Schritt 2:
echo "Refresh dependencies..."
ssh pi@fotobox.local 'source ~/.bashrc; cd /var/www/backend/photobooth/packages/nest-backend && pnpm install --frozen-lockfile'

# Schritt 3:
echo "Build backend..."
ssh pi@fotobox.local 'source ~/.bashrc; cd /var/www/backend/photobooth/packages/nest-backend && pnpm build'

echo "Finish! Backend was successfully deployed to the Raspberry Pi."
