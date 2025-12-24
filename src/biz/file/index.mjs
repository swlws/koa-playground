// biz/file/index.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const UPLOAD_DIR = path.resolve(process.cwd(), 'tmp/uploads');

/**
 * 跨设备安全移动文件
 */
async function moveFile(src, dest) {
  try {
    // 同设备，最快
    await fs.rename(src, dest);
  } catch (err) {
    if (err.code === 'EXDEV') {
      // 跨设备，退化为 copy + unlink
      await fs.copyFile(src, dest);
      await fs.unlink(src);
    } else {
      throw err;
    }
  }
}

async function resolveFileName(dir, filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);

  let target = filename;
  let index = 1;

  while (true) {
    try {
      await fs.access(path.join(dir, target));
      target = `${base}(${index})${ext}`;
      index++;
    } catch {
      return target;
    }
  }
}

export async function saveRemoteFile({
  filepath,
  originalFilename,
  mimetype,
  size,
}) {
  if (!filepath) {
    throw new Error('filepath is required');
  }

  const dateDir = new Date().toISOString().slice(0, 10);
  const uploadDir = path.join(UPLOAD_DIR, dateDir);

  await fs.mkdir(uploadDir, { recursive: true });

  const safeName = originalFilename || 'file';
  const finalName = await resolveFileName(uploadDir, safeName);

  const destPath = path.join(uploadDir, finalName);

  // ✅ 关键修复点
  await moveFile(filepath, destPath);

  return {
    filename: finalName,
    originalFilename,
    mimetype,
    size,
    path: destPath,
    url: `/uploads/${dateDir}/${finalName}`,
  };
}
