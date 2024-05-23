# Schritt 1:
echo "delete current themes"
ssh pi@fotobox.local 'rm ~/user-data/themes.json'

# Schritt 2:
echo "add current default-themes as themes"
scp ./packages/nest-backend/assets/defaultThemes.json pi@fotobox.local:~/user-data/themes.json