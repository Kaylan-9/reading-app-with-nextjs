import { Storage } from "@google-cloud/storage";

const serviceAccountKey: string = process.env.CREDENTIALS_CLOUD || '';
const storage = new Storage({
  credentials: JSON.parse(serviceAccountKey)
});

const bucket = storage.bucket(process.env.GCS_BUCKET as string);
export const createWriteStream = (filename: string, contentType?: string) => {
  const ref = bucket.file(filename);
  const stream = ref.createWriteStream({
    gzip: true,
    contentType: contentType,
  });
  return stream;
};
