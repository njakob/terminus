import Terminus from '..';

const term = new Terminus();

term.log`You will ${term.strikethrough('like')} ${term.underline('love')} ${term.bold.blue('Terminus')} to display ${term.red('c')}${term.green('o')}${term.yellow('l')}${term.blue('o')}${term.magenta('r')}${term.cyan('s')}`;
