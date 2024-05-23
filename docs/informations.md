# backend logs

- /var/www/backend/photobooth/packages/nest-backend/dist/log/photobooth-backend.log

- spiegelreflex
  - 3:2 format

# how to start in dev mode?

  1. start backend
    2. call backend <https://localhost:3001> and allow connection
  2. start and open frontend <http://localhost:5173/>

# What data are stored where

## available themes

- Themes are stored in themes.json inside the user-data folder
- if there is no themes.json, the boot process of the backend will automatically create that file based on the defaultThemes.json