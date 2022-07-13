# image-processing
This application uses express to expose an api to resize images as per width and height provided by the user. If an image of certain size is already processed, the same will be rendered the next time and won't be resized again.

## Scripts
1. Install dependencies - npm install
2. Prettier - npm run prettier
3. Build the project - npm run build
4. Start the server - npm run start OR Build the project (step 3) and run node build/.
5. Test - npm run test

*Note: All scripts must be run from image-processing directory*

## API details
API - http://127.0.0.1:5000/api/imageResize
Available query parameters are :
- Filename - Image file to be resized. Available images are - port.jpeg, scenicview.jpeg, tunnel.jpeg, waterfall.jpeg(string)
- Width - width you want to be resized to (integer)
- Height - width you want to be resized to (integer)

All the parameters are required!

example - http://127.0.0.1:5000/api/imageResize?filename=waterfall.jpeg&height=900&width=800
