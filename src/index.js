import process from "process";
import { greeting, sayGoodbye } from "./utils.js";


greeting();
process.on('exit', () => sayGoodbye());