ssh pi@fotobox.local /bin/bash << 'ENDSSH'
rm -rf /media/pi/135A-E15F2/originals/*
rm -rf /media/pi/135A-E15F2/previews/*
rm -rf /media/pi/135A-E15F2/prints/*
rm -rf /media/pi/135A-E15F2/deleted/*
ENDSSH
