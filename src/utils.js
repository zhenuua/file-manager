const { argv, exit, stderr } = process;
import { FLAG } from "./constants.js";


export const getFlagValue = (flag, numberOfValues = 1) => {
  if (flag === FLAG.USER_NAME) {
    return argv.splice(2).filter(arg => arg.startsWith(flag)).toString().replace(flag, '');
  }
  const flagIndex = process.argv.indexOf(flag);
  if (flagIndex === -1) {
    stderr.write(`please, try again with flag: ${flag}`);
    exit();
  }
  if (!argv[flagIndex + numberOfValues]) {
    stderr.write(`Have to be ${numberOfValues} value after ${flag}`);
    exit();
  }
  return process.argv[flagIndex + numberOfValues];
}

const userName = getFlagValue(FLAG.USER_NAME);

export const greeting = () => console.log(`Welcome to the File Manager, ${userName}!`);

export const sayGoodbye = () => console.log(`Thank you for using File Manager, ${userName}, goodbye!`);