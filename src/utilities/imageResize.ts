import path from 'path';
const imagesFolder = path.join(__dirname, '../../images');
const processedImagesFolder = path.join(__dirname, '../../processed_images');
import sharp from 'sharp';

async function imageResize(filename: string, width: number, height: number) {
  try {
    console.log('Resizing image with given width and height');
    await sharp(path.join(imagesFolder, filename))
      .resize(width, height)
      .jpeg({ quality: 50 })
      .toFile(
        path.join(
          processedImagesFolder,
          filename.split('.')[0] +
            '_' +
            width.toString() +
            '_' +
            height.toString() +
            '.' +
            filename.split('.')[1]
        )
      );
    return path.join(
      processedImagesFolder,
      filename.split('.')[0] +
        '_' +
        width.toString() +
        '_' +
        height.toString() +
        '.' +
        filename.split('.')[1]
    );
  } catch (err) {
    console.log('Error resizing image ', err);
    return null;
  }
}

export default imageResize;
