/* @flow */
/* eslint-disable no-console */

import { inspect } from 'util';
import ansiStyles from 'ansi-styles';
import { createProperties, parse, Data } from './common';

const backgroundsMapping = {
  black: 'bgBlack',
  red: 'bgRed',
  green: 'bgGreen',
  yellow: 'bgYellow',
  blue: 'bgBlue',
  magenta: 'bgMagenta',
  cyan: 'bgCyan',
  white: 'bgWhite',
};

export default class Terminus {
  constructor() {
    Object.defineProperties(this, createProperties());
  }

  transform(value: any): string {
    const valueType = typeof value;

    if (valueType === 'number' || valueType === 'string' || value instanceof String) {
      return value;
    } else if (value instanceof Data) {
      const { text, styles } = value;
      let output = '';

      if (styles.color) {
        output += ansiStyles[styles.color].open;
      }
      if (styles.background) {
        output += ansiStyles[backgroundsMapping[styles.background]].open;
      }
      if (styles.weight) {
        output += ansiStyles[styles.weight].open;
      }
      if (styles.style) {
        output += ansiStyles[styles.style].open;
      }
      if (styles.inverse) {
        output += ansiStyles.inverse.open;
      }
      if (styles.hidden) {
        output += ansiStyles.hidden.open;
      }
      if (styles.decoration) {
        output += ansiStyles[styles.decoration].open;
      }

      output += text;
      output += ansiStyles.reset.close;

      return output;
    }

    return inspect(value, {
      colors: true,
      depth: null,
    });
  }

  log(strings: Array<string>, ...keys: Array<any>): boolean {
    if (typeof console === 'undefined') {
      return false;
    }

    console.log(...parse(strings, keys, (string: string): string => this.transform(string)));

    return true;
  }
}
