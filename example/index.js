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
term.log({ high: 'performance' });
