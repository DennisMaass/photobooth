<script lang="ts" setup>
/**
Aufbau:
  - Klebe am gewünschten Stehort eine Linie auf den Boden
  - Stell die Box 2-2,5 Meter weg vor dem gewünschten Stehort auf
  - Schließe die Box am Strom an
  - Mache die Tür mit dem Chip auf
  - Schraube den Blitz auf die Kamera
  - ⁠Mach die Kamera an
  - ⁠Stell die Kamera richtig ein (gehe in den Automatik-Modus und mache ein Foto. Verändere den Ausschnitt der Kamera so, dass es einigermaßen mit der Preview des Tablets übereinstimmt)
  - Stelle den Drucker auf und stecke den aufgefüllten Papierlauf ein.
  - Mache das Tablet an (Drücke mit dem Stift oben rechts auf den Power-Knopf des Tablets)
  - ⁠Starte die App
  - Lock den Tabletbildschirm (durch 3 mal drücken auf den Home-Button des Tablets)
  - Mache die Tür wieder zu
  - Fertig!

Abbau:
  - ⁠Mach die Tür mit dem Chip auf.
  - ⁠Mach die Kamera aus
  - ⁠Schraub den Blitz von der Kamera und lege ihn in die Druckertasche
  - Zieh den Stromstecker
  - Entsperre den Tabletbildschirm, indem du 3 mal auf den Home-Button drückst, das Passwort 123456 eingibst und beenden drückst.
  - ⁠Schalte das Tablet aus. Drücke dafür mit dem Stift oben rechts auf den Power-Knopf des Tablets
  - ⁠Zieh den Papierlauf ab und nehm den Drucker ab. Räume beides in die Druckertasche.
  - ⁠Mach die Tür wieder zu 

Druckerfarbe nachfüllen:
  - Mach die Tür auf
  - ⁠Öffne das Außenfach des Druckers
  - ⁠Hol die Patrone raus
  - ⁠Steck die neue Patrone rein
  - ⁠Mach das Fach zu
  - ⁠Mach die Tür zu

Druckerpapier nachfüllen:
  - Zieh den Papierlauf seitlich raus
  - ⁠Mach die Klappe auf 
  - ⁠Füll Papier nach
  - ⁠Drück die Papierlauf wieder seitlich rein

Wenn die App sich aufhängt:
  - Mach die Tür auf
  - ⁠Schalte das Tablett aus und wieder an
  - ⁠Mach die Tür zu
 */

const setUpSteps = [
  { headline: "Klebe am gewünschten Stehort eine Linie auf den Boden" },
  { headline: "Stell die Box 2-2,5 Meter weg vor dem gewünschten Stehort auf" },
  { headline: "Schließe die Box am Strom an" },
  { headline: "Mache die Tür mit dem Chip auf" },
  { headline: "Schraube den Blitz auf die Kamera" },
  { headline: "Mach die Kamera an" },
  { headline: "Stell die Kamera richtig ein (gehe in den Automatik-Modus und mache ein Foto. Verändere den Ausschnitt der Kamera so, dass es einigermaßen mit der Preview des Tablets übereinstimmt)" },
  { headline: "Stelle den Drucker auf und stecke den aufgefüllten Papierlauf ein." },
  { headline: "Mache das Tablet an (Drücke mit dem Stift oben rechts auf den Power-Knopf des Tablets)" },
  { headline: "Starte die App" },
  { headline: "Lock den Tabletbildschirm (durch 3 mal drücken auf den Home-Button des Tablets)" },
  { headline: "Mache die Tür wieder zu" },
  { headline: "Fertig!" }
]

const dismantlingSteps = [
  { headline: "Mach die Tür mit dem Chip auf" },
  { headline: "Mach die Kamera aus" },
  { headline: "Schraub den Blitz von der Kamera und lege ihn in die Druckertasche" },
  { headline: "Zieh den Stromstecker" },
  { headline: "Entsperre den Tabletbildschirm, indem du 3 mal auf den Home-Button drückst, das Passwort 123456 eingibst und beenden drückst." },
  { headline: "Schalte das Tablet aus. Drücke dafür mit dem Stift oben rechts auf den Power-Knopf des Tablets" },
  { headline: "Zieh den Papierlauf ab und nehm den Drucker ab. Räume beides in die Druckertasche." },
  { headline: "Mach die Tür wieder zu" }
]

</script>

<template>
  <div class="config-view">
    <h1>Hallo 👋 Schön das du dich für uns entschieden hast. Nachfolgend zeige ich dir wie du die Box einrichtest und
      individuelle Anpassungen vornehmen kannst</h1>

    <div class="space-y-6">
      <h2>Einrichtung</h2>
      <ul class="space-y-4">
        <li v-for="step in setUpSteps" :key="step.headline">
          <h3>{{ step.headline }}</h3>
        </li>
      </ul>
    </div>

    <div class="space-y-6">
      <h2>Abbau</h2>
      <ul class="space-y-4">
        <li v-for="step in dismantlingSteps" :key="step.headline">
          <h3>{{ step.headline }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>
