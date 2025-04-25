// Ersetzt die Zeilen für KI-Bilder
const fs = require('fs');
const path = '/Users/kadirdiegopadinrodriguez/Desktop/Neuer Ordner 5/Portfoliobuild/src/components/Projects.tsx';
const content = fs.readFileSync(path, 'utf-8');

// Die Zeilen mit den Pfaden zu den alten KI-Bildern finden und ersetzen
const oldPaths = [
  '{ path: "/hero.jpg", alt: "KI-generierter Engel" }',
  '{ path: "/hero.jpg", alt: "KI-generiertes Goldfischglas" }',
  '{ path: "/hero.jpg", alt: "KI-generierter Hamster" }',
  '{ path: "/hero.jpg", alt: "KI-generiertes Schwein" }',
  '{ path: "/hero.jpg", alt: "KI-generierter Käfig" }',
  '{ path: "/hero.jpg", alt: "KI-generierte Taube" }'
];

const newPaths = [
  '{ path: "/kibilder/Mittel (Angel Kopie).jpeg", alt: "KI-generierter Engel" }',
  '{ path: "/kibilder/Mittel (Goldfischglas Kopie).jpeg", alt: "KI-generiertes Goldfischglas" }',
  '{ path: "/kibilder/Mittel (Hamster Kopie).jpeg", alt: "KI-generierter Hamster" }',
  '{ path: "/kibilder/Mittel (Schwein Kopie).jpeg", alt: "KI-generiertes Schwein" }',
  '{ path: "/kibilder/Mittel (käfig Kopie).jpeg", alt: "KI-generierter Käfig" }',
  '{ path: "/kibilder/Mittel (taube Kopie).jpeg", alt: "KI-generierte Taube" }'
];

let newContent = content;
for (let i = 0; i < oldPaths.length; i++) {
  newContent = newContent.replace(oldPaths[i], newPaths[i]);
}

fs.writeFileSync(path, newContent);
console.log('Datei erfolgreich aktualisiert!');
