// Ersetzt die Zeilen für KI-Bilder
const replacementCode = `  {
    id: 9,
    title: "KI-generierte Tierbilder",
    description: "Eine Sammlung von KI-generierten Tierbildern, die die Kreativität und Technologie in der digitalen Kunst demonstrieren. Dieses persönliche Projekt zeigt meinen experimentellen Umgang mit KI-Bildgenerierung und digitaler Kunstschaffung.",
    category: "other",
    images: [
      { path: "/kibilder/Mittel (Angel Kopie).jpeg", alt: "KI-generierter Engel" },
      { path: "/kibilder/Mittel (Goldfischglas Kopie).jpeg", alt: "KI-generiertes Goldfischglas" },
      { path: "/kibilder/Mittel (Hamster Kopie).jpeg", alt: "KI-generierter Hamster" },
      { path: "/kibilder/Mittel (Schwein Kopie).jpeg", alt: "KI-generiertes Schwein" },
      { path: "/kibilder/Mittel (käfig Kopie).jpeg", alt: "KI-generierter Käfig" },
      { path: "/kibilder/Mittel (taube Kopie).jpeg", alt: "KI-generierte Taube" }
    ],
    technologies: ["AI Image Generation", "Prompt Engineering", "Digital Art", "Midjourney"],
    featured: false,
    type: "academic",
    semester: "3. Semester",
    year: "2023"
  },`;

// Findet die Zeilen zwischen 202 und 219 und ersetzt sie
const fs = require('fs');
const path = '/Users/kadirdiegopadinrodriguez/Desktop/Neuer Ordner 5/Portfoliobuild/src/components/Projects.tsx';
const content = fs.readFileSync(path, 'utf-8');
const lines = content.split('\n');

// Den Bereich des KI-Projekts finden und ersetzen
const startPattern = /id: 9,/;
const endPattern = /year: "2023"/;
let startIndex = -1;
let endIndex = -1;

// Start- und Endindex finden
for (let i = 0; i < lines.length; i++) {
  if (startPattern.test(lines[i]) && startIndex === -1) {
    startIndex = i - 1; // Eine Zeile davor (die mit der öffnenden Klammer)
  }
  if (endPattern.test(lines[i]) && startIndex !== -1 && endIndex === -1) {
    endIndex = i + 2; // Eine Zeile danach (die mit der schließenden Klammer und dem Komma)
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  // Den Abschnitt ersetzen
  const newLines = [...lines.slice(0, startIndex), replacementCode, ...lines.slice(endIndex)];
  fs.writeFileSync(path, newLines.join('\n'));
  console.log('Datei erfolgreich aktualisiert!');
} else {
  console.error('Konnte die Sektion nicht finden!');
}
