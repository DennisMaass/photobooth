#!/bin/bash

# Luna
ssh pi@fotobox.local 'sudo wpa_cli -i wlan0 select_network 2'

# Livebox
#ssh pi@fotobox.local 'sudo wpa_cli -i wlan0 select_network 1'
