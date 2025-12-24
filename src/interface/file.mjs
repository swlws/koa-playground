// interface/file.mjs
import { saveRemoteFile } from '../biz/file/index.mjs';

export async function uploadFile(ctx) {
  const file = ctx.request.files?.file;

  if (!file) {
    ctx.throw(400, 'file is required');
  }

  // 兼容多文件 & 单文件
  const targetFile = Array.isArray(file) ? file[0] : file;

  const { filepath, originalFilename, mimetype, size } = targetFile;

  const result = await saveRemoteFile({
    filepath,
    originalFilename,
    mimetype,
    size,
  });

  ctx.body = {
    success: true,
    data: result,
  };
}
