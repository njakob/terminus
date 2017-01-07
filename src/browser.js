/* @flow */
/* eslint-disable no-console */

import { createProperties, parse, Data } from './common';
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

  transform(value: any, args: Array<any>): string {
    const valueType = typeof value;

    if (valueType === 'number' || valueType === 'string' || value instanceof String) {
      return value;
    } else if (value instanceof Data) {
      const { text, styles } = value;
      const cssStyles = {};

      if (styles.color) {
        cssStyles[styles.inverse ? 'background' : 'color'] = colorsMapping[styles.color];
      }
      if (styles.background) {
        cssStyles[styles.inverse ? 'color' : 'background'] = colorsMapping[styles.background];
      }
      if (cssStyles.background && !cssStyles.color) {
        cssStyles.color = colorsMapping.white;
      }
      if (styles.weight) {
        cssStyles['font-weight'] = weightsMapping[styles.weight];
      }
      if (styles.style) {
        cssStyles['font-style'] = styles.style;
      }
      if (styles.hidden) {
        cssStyles.opacity = '0%';
      }
      if (styles.decoration) {
        cssStyles['text-decoration'] = decorationsMapping[styles.decoration];
      }

      // Any empty string as CSS permits to reset the styles
      args.push(marshal(cssStyles));
      args.push('');
      return `%c${text}%c`;
    }

    args.push(value);
    return '';
  }

  log(strings: Array<string>, ...keys: Array<any>): boolean {
    if (typeof console === 'undefined') {
      return false;
    }

    console.log(...parse(strings, keys, (string: string, args: Array<any>): string => this.transform(string, args)));

    return true;
  }
}
