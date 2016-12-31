
# terminus [![Build Status][build-status-image]][travis] [![ESLint Config][eslint-config-image]][eslint-config]

Universal terminal helper inspired by [Chalk][chalk].

## Features

* Universal
* Partial Flowtype support

## Installation

[![NPM][npm-install-image]][npm]

With NPM:

```
$ npm install @njakob/terminus
```

With Yarn:

```
$ yarn add @njakob/terminus
```

## Usage

```js
import Terminus from '@njakob/terminus';

const term = new Terminus();

term.log('Stuff ', term.red('to log'));
```

## Licences

`njakob/terminus` is licensed under the [MIT License][licence].

[licence]: LICENSE
[chalk]: https://github.com/chalk/chalk
[eslint-config]: https://github.com/njakob/eslint-config
[npm]: https://nodei.co/npm/@njakob/terminus
[travis]: https://travis-ci.org/njakob/terminus
[npm-install-image]: https://nodei.co/npm/@njakob/terminus.png?downloads=true
[npm-status-image]: https://img.shields.io/npm/v/@njakob/terminus.svg
[build-status-image]: https://travis-ci.org/njakob/terminus.svg?branch=master
[eslint-config-image]: https://img.shields.io/badge/eslint_config-njakob-463fd4.svg
