import path from 'path';
import fs from 'fs';

export async function getStaticVideo(ctx) {
  const filename = ctx.params.filename;
  const videoPath = path.join(process.cwd(), 'public/videos', filename);

  if (!fs.existsSync(videoPath)) {
    ctx.status = 404;
    ctx.body = 'Video not found';
    return;
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = ctx.headers.range;

  if (!range) {
    // 无 Range —— 不支持拖动
    ctx.status = 200;
    ctx.set({
      'Content-Type': 'video/mp4',
      'Content-Length': fileSize,
    });
    ctx.body = fs.createReadStream(videoPath);
    return;
  }

  // 有 Range —— 支持视频拖动
  const parts = range.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = end - start + 1;

  const fileStream = fs.createReadStream(videoPath, { start, end });

  ctx.status = 206; // Partial Content
  ctx.set({
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'video/mp4',
  });

  ctx.body = fileStream;
}
