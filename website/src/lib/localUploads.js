import fs from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const VALID_SECTIONS = new Set(['events', 'staff', 'gallery', 'site']);

function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function getExtFromType(type) {
  if (type === 'image/jpeg') return 'jpg';
  if (type === 'image/png') return 'png';
  if (type === 'image/webp') return 'webp';
  return null;
}

export function isManagedUploadPath(filePath) {
  return typeof filePath === 'string' && filePath.startsWith('/uploads/');
}

export async function deleteLocalUpload(filePath) {
  if (!isManagedUploadPath(filePath)) return;
  const relative = filePath.replace(/^\/+/, '');
  const absolutePath = path.join(process.cwd(), 'public', relative);
  try {
    await fs.unlink(absolutePath);
  } catch {
    // Best-effort cleanup; file may already be removed.
  }
}

export async function storeUploadedImage(file, section = 'site') {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error('Only JPG, PNG, and WEBP images are allowed');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Image must be 5MB or smaller');
  }

  const normalizedSection = VALID_SECTIONS.has(section) ? section : 'site';
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', normalizedSection);
  await fs.mkdir(uploadDir, { recursive: true });

  const ext = getExtFromType(file.type) || path.extname(file.name).replace('.', '') || 'jpg';
  const base = sanitizeName(path.basename(file.name, path.extname(file.name))).slice(0, 50) || 'image';
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${base}.${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return `/uploads/${normalizedSection}/${uniqueName}`;
}
