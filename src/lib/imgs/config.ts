import { v2 as cloudimg } from 'cloudinary';

cloudimg.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export default cloudimg;