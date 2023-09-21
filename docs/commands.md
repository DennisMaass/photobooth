# setup new event (cleanup old event)

1. check if pictures of the original folder are saved
2. delete old pictures out of every folder
    1. script
        1. start photobooth
        2. connect to same wlan
        3. execute cleanup script
    1. usb stick
        1. pull usb stick while box is switched off
        2. connect with pc
        3. delete content of every folder

# finish event

1. download (at least original) pictures from usb stick via
    1. script
        1. start photobooth
        1. connect to same wlan
        1. execute download-picture script
    1. usb stick
        1. pull usb stick while box is switched off
        1. connect with pc
        1. download pictures
2. save them somethere

# change wlan
1. login to "raspi-webgui" wlan
1. call ""./tools/change-wlan.sh"
1. switch to choosen wlan

# deploy new frontend

1. goto frontend project "cd packages/vue-frontend/"
1. execute "./tools/deploy.sh"

# deploy new backend

1. ensure latest sourcecode is pushed
1. change wlan of the photobooth to one with internet (needed because of dependency install)
1. goto backend project "cd packages/nest-backend/"
1. execute "./tools/deploy.sh"

# reboot

1. goto project root
1. execute "./tools/reboot.sh"

# clean up disk space

- "du -h | sort -h" to check folder
- delete usb stick ".Trashes" folder
