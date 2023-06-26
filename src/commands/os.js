import os from "os";

const cpus = () => {
  const cpus = os.cpus();
  const table = cpus.map((cpu) => ({
    model: cpu.model,
    clockRate: `${cpu.speed / 1000} GHx`,
  }));
  console.table(table);
}

export const commonOs = (flag) => {
  switch (flag) {
    case '--EOL':
      console.log(`EOL: ${JSON.stringify(os.EOL)}`)
      break;
    case '--cpus':
      cpus();
      break;
    case '--architecture':
      console.log(`architecture: ${JSON.stringify(os.arch())}`);
      break;
    case '--homedir':
      console.log(`homedir: ${JSON.stringify(os.homedir())}`);
      break;
    case '--username':
      console.log(`System username: ${JSON.stringify(os.userInfo().username)}`);
      break;
    default:
      console.log('Error: use flag from the list: --EOL, --cpus, --architecture, --homedir, --username');
  }
}