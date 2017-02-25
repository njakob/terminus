
# terminus [![Build Status][build-status-image]][travis] [![ESLint Config][eslint-config-image]][eslint-config]

Universal terminal helper inspired by [Chalk][chalk].

## Features

* Universal
* Partial Flowtype support
* Tagged template literals based

## Installation

With NPM:

```sh
$ npm install @njakob/terminus
```

With Yarn:

```sh
$ yarn add @njakob/terminus
```

## Usage

Terminus uses tagged template literals in order to output colors in both your Node.js and browser applications.

```js
import Terminus from '@njakob/terminus';

const term = new Terminus();

term.log`Stuff to ${term.red('log')} with some ${term.bold.blue('colors')}`;
```

### Colors

* `` term.log`${term.black('black')}` ``
* `` term.log`${term.red('red')}` ``
* `` term.log`${term.green('green')}` ``
* `` term.log`${term.yellow('yellow')}` ``
* `` term.log`${term.blue('blue')}` ``
* `` term.log`${term.cyan('cyan')}` ``
* `` term.log`${term.magenta('magenta')}` ``
* `` term.log`${term.white('white')}` ``
* `` term.log`${term.gray('gray')}` ``

### Backgrounds

* `` term.log`${term.bgBlack('black')}` ``
* `` term.log`${term.bgRed('red')}` ``
* `` term.log`${term.bgGreen('green')}` ``
* `` term.log`${term.bgYellow('yellow')}` ``
* `` term.log`${term.bgBlue('blue')}` ``
* `` term.log`${term.bgCyan('cyan')}` ``
* `` term.log`${term.bgMagenta('magenta')}` ``
* `` term.log`${term.bgWhite('white')}` ``

### Modifiers

* `` term.log`${term.bold('bold')}` ``
* `` term.log`${term.dim('dim')}` ``
* `` term.log`${term.italic('italic')}` ``
* `` term.log`${term.inverse('inverse')}` ``
* `` term.log`${term.hidden('hidden')}` ``
* `` term.log`${term.strikethrough('strikethrough')}` ``
* `` term.log`${term.underline('underline')}` ``

## Licences

`njakob/terminus` is licensed under the [MIT License][licence].

[licence]: LICENSE
[chalk]: https://github.com/chalk/chalk
[eslint-config]: https://github.com/njakob/eslint-config
[npm]: https://nodei.co/npm/@njakob/terminus
[travis]: https://travis-ci.org/njakob/terminus
[npm-status-image]: https://img.shields.io/npm/v/@njakob/terminus.svg
[build-status-image]: https://travis-ci.org/njakob/terminus.svg?branch=master
[eslint-config-image]: https://img.shields.io/badge/eslint_config-njakob-463fd4.svg
