/* @flow */
/* eslint-disable no-console */

import { createProperties, Data } from './common';
import type { Styles } from './common';

const colorsMapping = {
  black: 'black',
  red: 'rgb(187,0,0)',
  green: 'rgb(0,187,0)',
  yellow: 'rgb(187,187,0)',
  blue: 'rgb(0,0,187)',
  magenta: 'rgb(187,0,187)',
  cyan: 'rgb(0,187,187)',
  white: 'white',
  gray: 'gray',
};

const weightsMapping = {
  bold: 'bold',
  dim: 200,
};

const decorationsMapping = {
  strikethrough: 'line-through',
  underline: 'underline'
};

function marshal(styles: Styles): string {
  return Object.keys(styles).reduce((acc: string, key: string): string => (
    `${acc}${key}:${styles[key]};`
  ), '');
}

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
        const cssStyles = {};

        if (styles.color) {
          cssStyles.color = colorsMapping[styles.color];
        }
        if (styles.weight) {
          cssStyles['font-weight'] = weightsMapping[styles.weight];
        }
        if (styles.style) {
          cssStyles['font-style'] = styles.style;
        }
        if (styles.inverse) {
          // TODO: implement inverse when background is available
        }
        if (styles.hidden) {
          cssStyles.opacity = '0%';
        }
        if (styles.decoration) {
          cssStyles['text-decoration'] = decorationsMapping[styles.decoration];
        }

        // Any empty string as CSS permits to reset the styles
        acc.push(`%c${text}%c`);
        acc.push(marshal(cssStyles));
        acc.push('');
      } else {
        acc.push(input);
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
