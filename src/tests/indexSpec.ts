import supertest from 'supertest';
import app from '../index';
import imageResize from '../utilities/imageResize';
import path from 'path';
import fs from 'fs';
const processedImagesFolder = path.join(__dirname, '../../processed_images');

const request = supertest(app);

describe('imageResize api response test', () => {
    it('checks for the presence of height and width query params', async () => {
        const response = await request.get('/api/imagereSize?filename=abcd.jpeg');
        expect(response.status).toBe(400);
        expect(response.text).toEqual(
            'Height and Width of the image to be displayed not provided!'
        );
    });
});

describe('imageResize api response test', () => {
    it('checks for the presence of filename', async () => {
        const response = await request.get(
            '/api/imagereSize?filename=waterfal.jpeg&width=100&height=100'
        );
        expect(response.status).toBe(400);
        expect(response.text).toEqual(
            'File does not exist! Please choose from : port.jpeg, scenicview.jpeg, tunnel.jpeg, waterfall.jpeg'
        );
    });
});

describe('imageResize api response test', () => {
    it('validating if value assigned to width is an integer', async () => {
        const response = await request.get(
            '/api/imagereSize?filename=waterfall.jpeg&width=abcd&height=100'
        );
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Provided width value is not integer!');
    });
});

describe('imageResize api response test', () => {
    it('validating if value assigned to height is an integer', async () => {
        const response = await request.get(
            '/api/imagereSize?filename=waterfall.jpeg&width=200&height=i'
        );
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Provided height value is not integer!');
    });
});

describe('imageResize api response test', () => {
    it('successful retuen of resized image', async () => {
        const response = await request.get(
            '/api/imagereSize?filename=waterfall.jpeg&width=200&height=200'
        );
        expect(response.status).toBe(200);
    });
});

describe('check if image is resized and stored in processed_images folder', () => {
    it('successful retuen of resized image', async () => {
        const filename = 'waterfall.jpeg';
        const width = 700;
        const height = 700;
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
        console.log('File to be created', processedImageFilePath);
        if (fs.existsSync(processedImageFilePath)) {
            console.log('file exists! deleting...');
            fs.unlinkSync(processedImageFilePath);
        }
        const imagePath = await imageResize(filename, width, height);
        const filePresence = fs.existsSync(processedImageFilePath);
        expect(imagePath).toEqual(processedImageFilePath);
        expect(filePresence).toBeTruthy();
    });
});
