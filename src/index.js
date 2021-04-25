import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { Forth_with_fs, ForthNodeExtensions } from 'webforth/forth_with_fs.js';
// Normally this would be: import Forth from 'webforth';

clear();

console.log(
  chalk.yellow(
    figlet.textSync('webforth-cli', { horizontalLayout: 'full' })
  )
);
// Valid choices for CELL:MEM are 2:8 2:16 2:32 3:8 4:8 4:16 4:32
const CELLL = 2; // 2 bytes for CELLL
const MEM = 16; // Use 16 bit memory
// Specify areas for ROM and RAM, currently they have to be specified separately as there is a bug with setting ROMSIZE = 0;
// ROM: Used for UserVariable save area and Dictionary (code and names) until useRam() is called
const ROMSIZE = 0x4000 * CELLL;
// RAM: Used for UserVariables, stacks, TIB, PAD etc and Dictionary (code and names) after useRam() is called
const RAMSIZE = 0x2000 * CELLL; // Make it larger will use
const extensions = ForthNodeExtensions; // Only current case is Node for running fs but that could change
const memClass = undefined; // Define to override default based on CELLL and MEM
const testFlags = 0; // bit field: 1 trace interpreter 2 trace threading 4 safety checks 8 tests TODO-67-TESTING - see unreadFile above //TODO-2ARDUINO

const forth = new Forth_with_fs({ CELLL, MEM, ROMSIZE, RAMSIZE, extensions, testFlags, memClass });
forth.initialize()
  .then(() => console.log('Forth with FS built'))
  .then(() => forth.console());
