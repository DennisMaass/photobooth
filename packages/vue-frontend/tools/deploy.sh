pnpm build

ssh pi@fotobox.local /bin/bash << 'ENDSSH'
rm -rf /var/www/html/*
ENDSSH 

scp -r ./dist/* pi@fotobox.local:/var/www/html/