import fs from "fs";
import process from "process";


export const cat = async (path) => {
  if (fs.existsSync(path)) {
    const readStream = fs.createReadStream(path);
    readStream.pipe(process.stdout);
    await new Promise((resolve, reject) => {
      readStream.on("end", () => resolve());
    });
  }
  else {
    console.log("Error: Path doesn't exist");
  }
}

export const add = async (path) => {
  const writer = fs.createWriteStream(path);
}

export const rn = (path, newFile) => {
  if (fs.existsSync(path)) {
    if (!fs.existsSync(newFile)) {
      fs.rename(path, newFile, () => {
        console.log("File was renamed");
      });
    } else {
      console.log("Error: This file already exist");
    }
  } else {
    console.log("Error: Incorrect path");
  }
}

export const cp = async (path, newFile, removeFileByPath = false) => {
  if (fs.existsSync(path, newFile)) {
    if (!path.includes(".txt") || !newFile.includes(".txt")) {
      return console.log("Error: Files have to be txt");
    }
    let readStream = new fs.createReadStream(path, "utf-8");
    let writeStream = fs.createWriteStream(newFile);
    readStream.on("data", (chunk) => {
      writeStream.write(chunk);
    });
    await new Promise((resolve, reject) => {
      readStream.on("end", () => resolve());
    });
    if (removeFileByPath) {
      rm(path)
    }
  } else {
    console.log("Error: Incorrect path");
  }
}

export const mv = async (path, newFile) => {
  cp(path, newFile, true);
}

export const rm = async (path) => {
  try {
    fs.unlinkSync(path);
  } catch (error) {
    console.log("Error: File doesn't exist");
  }
}
