import fs from "fs";
import crypto from "crypto";

export const hash = (path) => {
  try {
    const text = fs.readFileSync(path);
    const fileHash = (value) =>
      new Promise((resolve) =>
        resolve(crypto.createHash("sha256").update(value).digest("hex"))
      );
    fileHash(text).then(console.log);
  } catch (err) {
    console.log("Error: File doesn't exist");
  }
}
