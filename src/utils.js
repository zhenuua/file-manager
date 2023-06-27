const { argv } = process;

const FLAG_USER_NAME = '--username=';

export const getUserName = (flag) =>
  argv.splice(2).filter(arg => arg.startsWith(flag)).toString().replace(flag, '');

const userName = getUserName(FLAG_USER_NAME);

export const greeting = () => console.log(`Welcome to the File Manager, ${userName}!`);

export const sayGoodbye = () => console.log(`Thank you for using File Manager, ${userName}, goodbye!`);