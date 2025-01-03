import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkFile(filepath) {
  try {
    const stats = await fs.stat(filepath);
    console.log(`File ${filepath} exists:`, {
      size: stats.size,
      isFile: stats.isFile(),
      permissions: stats.mode
    });
    return true;
  } catch (error) {
    console.error(`Error checking file ${filepath}:`, error.message);
    return false;
  }
}

async function compressImage(inputPath, outputPath, options = {}) {
  const {
    quality = 80,
    width = null,
    format = 'webp'
  } = options;

  try {
    let pipeline = sharp(inputPath);

    if (width) {
      pipeline = pipeline.resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    if (format === 'webp') {
      pipeline = pipeline.webp({ quality });
    } else if (format === 'avif') {
      pipeline = pipeline.avif({ quality });
    }

    await pipeline.toFile(outputPath);
    const stats = await fs.stat(outputPath);
    console.log(`Compressed ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    console.log(`New size: ${(stats.size / 1024).toFixed(2)}KB`);
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error);
    throw error;
  }
}

async function main() {
  const imagesToCompress = [
    'Angel.png',
    'Goldfischglas.png',
    'Hamster.png',
    'Schwein.png',
    'käfig.png',
    'taube.png'
  ];

  const formats = ['webp', 'avif'];
  const sizes = [null, 800, 400];  // null means original size

  for (const image of imagesToCompress) {
    const inputPath = path.join(__dirname, 'src', 'assets', image);
    
    if (!(await checkFile(inputPath))) {
      console.log(`Skipping ${image} - file not found`);
      continue;
    }

    for (const format of formats) {
      for (const width of sizes) {
        const suffix = width ? `-${width}w` : '';
        const outputPath = path.join(
          __dirname,
          'src',
          'assets',
          'compressed',
          `${path.parse(image).name}${suffix}.${format}`
        );

        await compressImage(inputPath, outputPath, {
          quality: 80,
          width,
          format
        });
      }
    }
  }
}

// Create compressed directory if it doesn't exist
fs.mkdir(path.join(__dirname, 'src', 'assets', 'compressed'), { recursive: true })
  .then(() => main())
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
