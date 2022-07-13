import path from 'path';
const imagesFolder = path.join(__dirname, '../../images');
const processedImagesFolder = path.join(__dirname, '../../processed_images');
import imageResize from '../utilities/imageResize';
import fs from 'fs';
import { Request, Response } from 'express';

const resizeImage = async (req: Request, res: Response): Promise<void> => {
  const filename: string | undefined = String(req.query.filename);
  const height: number | undefined = Number(req.query.height);
  const width: number | undefined = Number(req.query.width);
  console.log(filename, width, height);

  if (!width && !height) {
    res
      .status(400)
      .send('"height" and "width" are required and expect integer values!');
    return;
  }

  if (!width) {
    res
      .status(400)
      .send('"width" parameter is required and integer value is expected!');
    return;
  }

  if (!height) {
    res
      .status(400)
      .send('"height" parameter is required and integer value is expected!');
    return;
  }

  const imageFilePath = path.join(imagesFolder, filename);
  const processedImageFilePath = path.join(
    processedImagesFolder,
    filename.split('.')[0] +
      '_' +
      width.toString() +
      '_' +
      height.toString() +
      '.' +
      filename.split('.')[1]
  );

  if (fs.existsSync(imageFilePath)) {
    console.log('File exists!');
  } else {
    res
      .status(400)
      .send(
        'File does not exist! Please choose from : port.jpeg, scenicview.jpeg, tunnel.jpeg, waterfall.jpeg'
      );
    return;
  }

  // Check and render the image with given width and height if already available
  if (fs.existsSync(processedImageFilePath)) {
    console.log('Rendering processed image');
    res.status(200).sendFile(processedImageFilePath);
    return;
  }

  const resizedImagePath = await imageResize(filename, width, height);
  console.log('Resized image path', resizedImagePath);
  if (resizedImagePath === null) {
    res.status(500).send('Server error while resizing image:(');
  } else {
    res.status(200).sendFile(resizedImagePath);
  }
  return;
};

export default resizeImage;
