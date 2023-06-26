import readline from "readline";
import process from "process";
import { isAbsolute, resolve } from "path";
import { greeting, sayGoodbye } from "./utils.js";
import { cd, up, ls } from "./commands/navigation.js";
import { commonOs } from "./commands/os.js";
import { hash } from "./commands/hash.js";


export class App {
  rootDir = process.cwd();
  currentPath = this.rootDir;
  absPath;

  constructor() {
    greeting();
    console.log(this.rootDir);
    process.on('exit', () => sayGoodbye());
  }

  async start() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", async (input) => {
      const commandList = input.split(' ');
      const command = commandList[0];
      const firstArg = commandList[1];
      const secondArg = commandList[2];
      switch (true) {
        case '.exit':
          process.exit();

        case command === 'cd' && commandList.length === 2:
          this.createAbsolutePath(firstArg)
          const newCdPath = cd(this.absPath);
          if (newCdPath) {
            this.currentPath = newCdPath;
          }
          break;

        case command === 'up' && commandList.length === 1:
          const newUpPath = up(this.currentPath, this.rootDir);
          this.currentPath = newUpPath;
          break;

        case command === 'ls' && commandList.length === 1:
          ls(this.currentPath)
          break;

        case command === 'os' && commandList.length === 2:
          commonOs(firstArg);
          break;

        case command === 'hash' && commandList.length === 2:
          this.createAbsolutePath(firstArg)
          hash(this.absPath);
          break;

        default:
          console.log("The command doesn't exist");
      }
      console.log(this.currentPath);
    }
    );
  }

  createAbsolutePath = (path) => {
    if (isAbsolute(path)) {
      this.absPath = path;
    } else {
      const newAbsPath = resolve(this.currentPath, path);
      this.absPath = newAbsPath;
    }
  };
}
