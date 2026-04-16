// Image URL mappings for existing website images
// After uploading images to Cloudinary, update these URLs

export const imageUrls = {
  // Main images used in pages
  'school-building.jpg': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/school-building.jpg',
  'school-corridor.jpg': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/school-corridor.jpg',
  'tree-planting.jpg': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/tree-planting.jpg',
  'educational-trip.jpg': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/educational-trip.jpg',
  'water-facility.jpg': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/water-facility.jpg',
  'staff-group.png': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/staff-group.png',

  // Gallery images
  'unnamed.webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed.webp',
  'unnamed1.webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed1.webp',
  'unnamed (1).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_1_.webp',
  'unnamed (2).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_2_.webp',
  'unnamed (3).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_3_.webp',
  'unnamed (4).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_4_.webp',
  'unnamed (5).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_5_.webp',
  'unnamed (6).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_6_.webp',
  'unnamed (7).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_7_.webp',
  'unnamed (8).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_8_.webp',
  'unnamed (9).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_9_.webp',
  'unnamed (10).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_10_.webp',
  'unnamed (11).webp': 'https://res.cloudinary.com/27Qus4bs9JGYRc6_mR82bcpm9l8/image/upload/school/unnamed_11_.webp',
};

export function getImageUrl(filename) {
  return imageUrls[filename] || null;
}

export function getImageUrlOrDefault(filename, fallback = '/images/placeholder.jpg') {
  return imageUrls[filename] || fallback;
}
