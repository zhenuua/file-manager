import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';


export const compress = async (input, output) => {
  try {
    const pipe = promisify(pipeline);
    const gzip = createBrotliCompress();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
  }
  catch {
    console.log('Error: incorrect input or output path');
  }
};

export const decompress = async (input, output) => {
  try {
    const pipe = promisify(pipeline);
    const gzip = createBrotliDecompress();
    const source = createReadStream(input);
    const destination = createWriteStream(output, {
      encoding: 'utf-8'
    });
    await pipe(source, gzip, destination);
  }
  catch {
    console.log('Error: incorrect input or output path');
  }
};