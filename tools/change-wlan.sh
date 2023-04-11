#!/bin/bash

# Luna
#ssh pi@fotobox.local 'sudo wpa_cli -i wlan0 select_network 0'

# Livebox
ssh pi@fotobox.local 'sudo wpa_cli -i wlan0 select_network 1'
