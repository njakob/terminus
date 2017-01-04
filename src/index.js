/* @flow */
/* eslint-disable no-console */

import { inspect } from 'util';
import ansiStyles from 'ansi-styles';
import { createProperties, Data } from './common';

export default class Terminus {
  constructor() {
    Object.defineProperties(this, createProperties());
  }

  transform(...inputs: Array<any>): Array<any> {
    return inputs.reduce((acc: Array<any>, input: any): Array<any> => {
      const inputType = typeof input;

      if (inputType === 'number' || inputType === 'string' || input instanceof String) {
        acc.push(input);
      } else if (input instanceof Data) {
        const { text, styles } = input;
        let output = '';

        if (styles.color) {
          output += ansiStyles[styles.color].open;
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

        acc.push(output);
      } else {
        acc.push(inspect(input, {
          colors: true,
          depth: null,
        }));
      }

      return acc;
    }, []);
  }

  log(...inputs: Array<any>): boolean {
    if (typeof console === 'undefined') {
      return false;
    }

    console.log(...this.transform(...inputs));

    return true;
  }
}
