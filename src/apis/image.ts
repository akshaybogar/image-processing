import path from 'path';
const imagesFolder = path.join(__dirname, '../../images');
const processedImagesFolder = path.join(__dirname, '../../processed_images');
import imageResize from '../utilities/imageResize';
import fs from 'fs';

const resizeImage = async (req, res) => {
  const filename = req.query.filename;
  let height = req.query.height;
  let width = req.query.width;

  if (!width && !height) {
    return res
      .status(400)
      .send('Height and Width of the image to be displayed not provided!');
  }

  if (!width) {
    return res
      .status(400)
      .send('Width of the image to be displayed not provided!');
  }

  if (!height) {
    return res
      .status(400)
      .send('Height of the image to be displayed not provided!');
  }

  height = parseInt(height);
  width = parseInt(width);

  if (Number.isNaN(width)) {
    return res.status(400).send('Provided width value is not integer!');
  }

  if (Number.isNaN(height)) {
    return res.status(400).send('Provided height value is not integer!');
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
    return res
      .status(400)
      .send(
        'File does not exist! Please choose from : port.jpeg, scenicview.jpeg, tunnel.jpeg, waterfall.jpeg'
      );
  }

  // Check and render the image with given width and height if already available
  if (fs.existsSync(processedImageFilePath)) {
    console.log('Rendering processed image');
    return res.status(200).sendFile(processedImageFilePath);
  }

  const resizedImagePath = await imageResize(filename, width, height);
  console.log('Resized image path', resizedImagePath);
  if (resizedImagePath === null) {
    return res.status(500).send('Server error while resizing image:(');
  } else {
    res.status(200).sendFile(resizedImagePath);
  }
};

export default resizeImage;
