import { dirname } from "path";
import fs from "fs";
import * as fsP from "fs/promises";

export const cd = (path) =>
  fs.existsSync(path) ? path : console.log("Error: Path doesn't exist");

export const up = (path, rootDir) => {
  if (path === rootDir) {
    console.log("Error: You already in the root dir");
    return path;
  } else {
    const result = dirname(path);
    return result;
  }
}

export const ls = async (currentPath) => {
  try {
    const filesList = await fsP.readdir(currentPath, { withFileTypes: true });
    const table = [];
    class Entity {
      constructor(name, type) {
        this.name = name;
        this.type = type;
      }
    }

    filesList
      .sort((a, b) => a.isFile() - b.isFile())
      .forEach((entity) => {
        const row = new Entity(entity.name, entity.isFile() ? "file" : "directory");
        table.push(row)
      });
    console.table(table);
  } catch {
    console.log(
      "Error: this path isn't a folder or this folder is empty"
    );
  }
}
