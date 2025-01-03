import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const compressImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 80,
        progressive: true
      })
      .toFile(outputPath);
    
    console.log(`✓ Compressed: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error);
  }
};

const main = async () => {
  const sourceDir = path.join(process.cwd(), 'src', 'assets', 'Public');
  const outputDir = path.join(process.cwd(), 'src', 'assets', 'Compressed');

  try {
    // Erstelle Output-Verzeichnis, falls es nicht existiert
    await fs.mkdir(outputDir, { recursive: true });
    
    const files = await fs.readdir(sourceDir);
    console.log('Found files:', files);
    
    for (const file of files) {
      if (file.match(/\.(png|jpg|jpeg)$/i)) {
        const inputPath = path.join(sourceDir, file);
        const outputPath = path.join(outputDir, file.replace(/\.[^.]+$/, '.jpg'));
        
        console.log(`Compressing ${file}...`);
        await compressImage(inputPath, outputPath);
      }
    }
    
    console.log('Compression complete! Check the Compressed directory.');
  } catch (error) {
    console.error('Error:', error);
  }
};

console.log('Starting compression...');
main().catch(console.error);
