#!/usr/bin/env node

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public');
const OUTPUT_DIR = path.join(__dirname, '../public/optimized');

// Image optimization configurations
const SIZES = [400, 800, 1200];
const QUALITY = {
  webp: 85,
  avif: 60,
  jpeg: 85,
  png: 90
};

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function optimizeImage(inputPath, outputDir, filename) {
  const baseName = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();
  
  console.log(`\n🖼️  Processing: ${filename}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`   Original: ${metadata.width}x${metadata.height} (${(await fs.stat(inputPath)).size / 1024 / 1024} MB)`);
    
    // Generate different sizes and formats
    for (const size of SIZES) {
      // Skip if original is smaller than target size
      if (metadata.width && metadata.width < size) continue;
      
      const resizedImage = image.resize(size, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
      
      // WebP format
      await resizedImage
        .webp({ quality: QUALITY.webp, effort: 6 })
        .toFile(path.join(outputDir, `${baseName}-${size}.webp`));
      
      // AVIF format (smaller, better compression)
      await resizedImage
        .avif({ quality: QUALITY.avif, effort: 9 })
        .toFile(path.join(outputDir, `${baseName}-${size}.avif`));
      
      // Fallback JPEG/PNG
      if (ext === '.png') {
        await resizedImage
          .png({ quality: QUALITY.png, compressionLevel: 9 })
          .toFile(path.join(outputDir, `${baseName}-${size}.png`));
      } else {
        await resizedImage
          .jpeg({ quality: QUALITY.jpeg, progressive: true })
          .toFile(path.join(outputDir, `${baseName}-${size}.jpg`));
      }
      
      console.log(`   ✅ Generated ${size}px versions`);
    }
    
    // Create low-quality placeholder (10px wide, heavily blurred)
    await image
      .resize(10, null, { withoutEnlargement: true })
      .blur(2)
      .webp({ quality: 20 })
      .toFile(path.join(outputDir, `${baseName}-placeholder.webp`));
    
    console.log(`   ✅ Created blur placeholder`);
    
  } catch (error) {
    console.error(`   ❌ Error processing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  await ensureDir(OUTPUT_DIR);
  
  // List of images to optimize
  const imagesToOptimize = [
    'hardware.png',
    'coolpic.png', 
    'profilepic.JPG',
    'Homelab Network and Storage Diagram.png'
  ];
  
  for (const filename of imagesToOptimize) {
    const inputPath = path.join(INPUT_DIR, filename);
    
    try {
      await fs.access(inputPath);
      await optimizeImage(inputPath, OUTPUT_DIR, filename);
    } catch (error) {
      console.log(`   ⚠️  Skipping ${filename} (not found)`);
    }
  }
  
  console.log('\n✨ Image optimization complete!');
  console.log('\n📊 Summary:');
  console.log('   - Generated WebP, AVIF, and fallback formats');
  console.log('   - Created 400px, 800px, and 1200px sizes');
  console.log('   - Added blur placeholders for progressive loading');
  console.log('\n💡 Next: Update your React components to use the optimized images!');
}

main().catch(console.error);