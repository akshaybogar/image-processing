import supertest from 'supertest';
import app from '../index';
//import printMessage from "../index";

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
