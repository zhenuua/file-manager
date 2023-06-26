const { argv } = process;
import { FLAG } from "./constants.js";

export const getUserName = (flag) =>
  argv.splice(2).filter(arg => arg.startsWith(flag)).toString().replace(flag, '');

const userName = getUserName(FLAG.USER_NAME);

export const greeting = () => console.log(`Welcome to the File Manager, ${userName}!`);

export const sayGoodbye = () => console.log(`Thank you for using File Manager, ${userName}, goodbye!`);