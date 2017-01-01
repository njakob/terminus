/* @flow */
/* eslint-disable no-console */

import { inspect } from 'util';
import styles from 'ansi-styles';
import { createNode } from './common';
import type { Decorator } from './common';

class DecoratorData {
  text: string;

  constructor(text: string = '') {
    this.text = text;
  }
}

type CreateDecoratorOptions = {
  key: string;
};

function createDecorator({ key }: CreateDecoratorOptions): Decorator<*> {
  return (input: string, {
    text
  }: DecoratorData = new DecoratorData()): DecoratorData => (
    new DecoratorData(`${text}${styles[key].open}${input}${styles[key].close}`)
  );
}

const decorators = {
  black: createDecorator({ key: 'blue' }),
  red: createDecorator({ key: 'red' }),
  green: createDecorator({ key: 'green' }),
  yellow: createDecorator({ key: 'yellow' }),
  blue: createDecorator({ key: 'blue' }),
  magenta: createDecorator({ key: 'magenta' }),
  cyan: createDecorator({ key: 'cyan' }),
  white: createDecorator({ key: 'white' }),
  gray: createDecorator({ key: 'gray' }),
  bold: createDecorator({ key: 'bold' }),
  dim: createDecorator({ key: 'dim' }),
  italic: createDecorator({ key: 'italic' }),
  inverse: createDecorator({ key: 'inverse' }),
  hidden: createDecorator({ key: 'hidden' }),
  strikethrough: createDecorator({ key: 'strikethrough' }),
  underline: createDecorator({ key: 'underline' }),
};

const node = {};
Object.keys(decorators).forEach((key: string) => {
  node[key] = {
    get: (): any => createNode(node, decorators[key], new DecoratorData())
  };
});

export default class Terminus {
  constructor() {
    Object.defineProperties(this, node);
  }

  log(...inputs: Array<any>): boolean {
    let finalText = '';

    inputs.forEach((input: any) => {
      let data: ?DecoratorData = null;

      if (input instanceof DecoratorData) {
        data = input;
      } else if (typeof input === 'string' || input instanceof String) {
        data = new DecoratorData(input);
      } else {
        finalText += `${inspect(input, { colors: true, depth: null })} `;
      }

      if (data) {
        const { text }: DecoratorData = data;

        finalText += text;
      }
    });

    console.log(finalText);

    return true;
  }
}
