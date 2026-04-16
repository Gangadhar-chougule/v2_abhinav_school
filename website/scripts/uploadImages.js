require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

if (!cloudName || !apiKey) {
  console.error('Error: Cloudinary credentials not found');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
});

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const outputFile = path.join(__dirname, '..', 'src', 'lib', 'imageUrls.js');

const imageFiles = [
  'educational-trip.jpg',
  'school-building.jpg',
  'school-corridor.jpg',
  'staff-group.png',
  'tree-planting.jpg',
  'water-facility.jpg',
];

async function uploadImage(filename) {
  const filePath = path.join(imagesDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  [SKIP] ${filename} - file not found`);
    return null;
  }

  const publicId = filename.replace(/\.[^/.]+$/, '').replace(/[\s()]/g, '_');
  const resourceType = filename.endsWith('.png') ? 'auto' : 'auto';
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: `school/${publicId}`,
      folder: 'school',
      resource_type: resourceType,
    });
    console.log(`  [OK] ${filename} -> ${result.secure_url}`);
    return { filename, url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.log(`  [ERROR] ${filename} - ${error.message}`);
    return null;
  }
}

async function uploadAll() {
  console.log('Uploading images to Cloudinary...\n');
  console.log(`Cloud: ${cloudName}`);
  console.log(`Directory: ${imagesDir}\n`);

  const results = [];
  
  for (const filename of imageFiles) {
    const result = await uploadImage(filename);
    if (result) results.push(result);
  }

  console.log(`\nUploaded ${results.length} main images`);

  const mapping = results.map(r => `  '${r.filename}': '${r.url}',`).join('\n');
  const jsContent = `// Auto-generated image URLs from Cloudinary\nexport const imageUrls = {\n${mapping}\n};\n\nexport const getImageUrl = (filename) => imageUrls[filename] || null;\n`;
  
  fs.writeFileSync(outputFile, jsContent);
  console.log(`Generated: ${outputFile}`);

  console.log('\nDone!');
}

uploadAll();
