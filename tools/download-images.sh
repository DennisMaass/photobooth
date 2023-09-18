mkdir ~/projects/fotobox/events/$1

scp -r pi@fotobox.local:/media/pi/135A-E15F2/originals/ ~/projects/fotobox/events/$1
scp -r pi@fotobox.local:/media/pi/135A-E15F2/previews/ ~/projects/fotobox/events/$1
scp -r pi@fotobox.local:/media/pi/135A-E15F2/prints/ ~/projects/fotobox/events/$1
scp -r pi@fotobox.local:/media/pi/135A-E15F2/deleted/ ~/projects/fotobox/events/$1
