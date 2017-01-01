/* eslint-disable no-console */

import Terminus from '../lib';

const term = new Terminus();

term.log('List of ', term.blue('Terminus'), ' styles');
term.log(term.black('black'));
term.log(term.red('red'));
term.log(term.green('green'));
term.log(term.yellow('yellow'));
term.log(term.blue('blue'));
term.log(term.magenta('magenta'));
term.log(term.cyan('cyan'));
term.log(term.white('white'));
term.log(term.gray('gray'));
term.log(term.bold('bold'));
term.log(term.dim('dim'));
term.log(term.italic('italic'));
term.log(term.inverse('inverse'));
term.log(term.hidden('hidden'));
term.log(term.strikethrough('strikethrough'));
term.log(term.underline('underline'));
term.log({ high: 'performance' });
