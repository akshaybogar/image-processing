const image = require('../routes/image');
const path = require('path');
const imagesFolder = path.join(__dirname, '../../images');
const processedImagesFolder = path.join(__dirname, '../../processed_images');
const fs = require('fs');
const sharp = require('sharp');

const resizeImage = async (req, res) => {
    console.log(imagesFolder, processedImagesFolder);
    let filename = req.query.filename;
    let height = req.query.height;
    let width = req.query.width;

    if (!width && !height) {
        res.send('Height and Width of the image to be displayed not provided!');
    }

    height = parseInt(height);
    width = parseInt(width);

    if (Number.isNaN(width)) {
        res.send('Provided width value is not integer!');
    }

    if (Number.isNaN(height)) {
        res.send('Provided height value is not integer!');
    }

    if (fs.existsSync(path.join(imagesFolder, filename))) {
        console.log('File exists!');
    } else {
        return res.send(
            'File does not exist! Please choose from : port.jpeg, scenicview.jpeg, tunnel.jpeg, waterfall.jpeg'
        );
    }

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

    res.sendFile(
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
};

module.exports = {
    resizeImage,
};
