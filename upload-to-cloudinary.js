import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check for required environment variables
if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Missing required environment variables. Please check your .env file');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Script started');
console.log('Current directory:', __dirname);

// Cloudinary configuration
const config = {
  cloud_name: 'dwxoapjlq',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
};

console.log('Cloudinary config initialized');
cloudinary.config(config);

const imagesToUpload = [
  'Angel.jpg',
  'Goldfischglas.jpg',
  'Hamster.jpg',
  'Schwein.jpg',
  'käfig.jpg',
  'taube.jpg'
];

async function uploadToCloudinary(filepath, publicId) {
  try {
    console.log(`Uploading ${filepath}...`);
    const isVideo = /\.(mov|mp4)$/i.test(filepath);
    
    const options = {
      public_id: publicId,
      folder: 'portfolio',
      resource_type: isVideo ? 'video' : 'image',
      transformation: isVideo ? [] : [
        { width: 1920, height: 1080, crop: 'limit', quality: 'auto:good' }
      ]
    };

    console.log('Upload options:', options);
    console.log('Checking if file exists...');
    const fileStats = await fs.stat(filepath);
    console.log('File stats:', fileStats);

    console.log('Starting upload to Cloudinary...');
    const result = await cloudinary.uploader.upload(filepath, options);
    console.log('Upload result:', result);
    console.log(`Successfully uploaded ${filepath}`);
    return result;
  } catch (error) {
    console.error(`Error uploading ${filepath}:`, error);
    if (error.stack) console.error('Stack trace:', error.stack);
    return null;
  }
}

async function main() {
  try {
    const compressedDir = path.join(process.cwd(), 'src', 'assets', 'Compressed');
    console.log('Compressed directory:', compressedDir);
    
    const urlMappings = {};
    
    // Upload compressed images
    for (const filename of imagesToUpload) {
      console.log(`\nProcessing ${filename}`);
      const filepath = path.join(compressedDir, filename);
      console.log('Full file path:', filepath);
      
      try {
        const stats = await fs.stat(filepath);
        console.log('File stats:', stats);
        
        if (stats.size > 100 * 1024 * 1024) { // Skip files larger than 100MB
          console.log(`Skipping ${filename} - file too large (${stats.size} bytes)`);
          continue;
        }
        
        const publicId = `portfolio/${path.parse(filename).name}`;
        const result = await uploadToCloudinary(filepath, publicId);
        if (result && result.secure_url) {
          urlMappings[filename] = result.secure_url;
          console.log(`Successfully uploaded ${filepath}`);
        }
      } catch (error) {
        console.error(`Error processing ${filepath}:`, error);
        console.error('Error details:', error);
      }
    }
    
    // Save URL mappings to a file
    const mappingsPath = path.join(process.cwd(), 'cloudinary-urls.json');
    await fs.writeFile(mappingsPath, JSON.stringify(urlMappings, null, 2));
    console.log('\nURL mappings saved to', mappingsPath);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Starte das Skript
console.log('Starting main function...');
main().catch(error => {
  console.error('Unhandled error:', error);
  if (error.stack) console.error('Stack trace:', error.stack);
  process.exit(1);
});
