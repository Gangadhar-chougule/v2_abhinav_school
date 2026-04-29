// Local image URL mappings from public/images
export const imageUrls = {};

export function getImageUrl(filename) {
  const mapped = imageUrls[filename];
  if (mapped) {
    return mapped;
  }
  return `/images/${filename}`;
}

export function getImageUrlOrDefault(filename, fallback = '/images/placeholder.jpg') {
  return imageUrls[filename] || fallback;
}
