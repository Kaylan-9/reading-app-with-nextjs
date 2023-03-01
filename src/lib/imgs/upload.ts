import cloudimg from "./config";

export const doUpload= async (url: string, flag: string) => {
  try {
    const response= await cloudimg.uploader.upload(url, {public_id: flag});
  } catch(err) {
    console.log('Error', err);
  }
}
