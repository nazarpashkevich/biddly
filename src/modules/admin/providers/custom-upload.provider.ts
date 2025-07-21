// custom-upload-provider.factory.ts

import type { UploadedFile } from 'adminjs';
import fsExtra from 'fs-extra';
import path from 'path';

export const createCustomUploadProvider = async () => {
  const { LocalProvider } = await import('@adminjs/upload');

  return class CustomUploadProvider extends LocalProvider {
    public async upload(file: UploadedFile, key: string): Promise<any> {
      const filePath =
        process.platform === 'win32' ? this.path(key) : this.path(key).slice(1);

      await fsExtra.mkdir(path.dirname(filePath), { recursive: true });

      try {
        await fsExtra.move(file.path, filePath, { overwrite: true });
      } catch (err: any) {
        if (err.code === 'EXDEV') {
          await fsExtra.copyFile(file.path, filePath);
          await fsExtra.unlink(file.path);
        } else {
          throw err;
        }
      }
    }
  };
};
