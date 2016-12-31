/* @flow */
/* eslint-disable no-console */

import { createNode } from './common';
import type { Decorator } from './common';

class DecoratorData {
  text: string;
  stylesList: Array<any>;

  constructor(text: string = '', stylesList: Array<any> = []) {
    this.text = text;
    this.stylesList = stylesList;
  }
}

type CreateDecoratorOptions = {
  color: string;
};

function createDecorator({ color }: CreateDecoratorOptions): Decorator<*> {
  return (input: string, {
    text,
    stylesList,
  }: DecoratorData = new DecoratorData()): DecoratorData => (
    new DecoratorData(
      `${text}%c${input}%c`,
      [
        ...stylesList,
        {
          color,
        },
        {},
      ]
    )
  );
}

const decorators = {
  black: createDecorator({ color: 'rgb(0, 0, 0)' }),
  red: createDecorator({ color: 'rgb(187, 0, 0)' }),
  green: createDecorator({ color: 'rgb(0, 187, 0)' }),
  yellow: createDecorator({ color: 'rgb(187, 187, 0)' }),
  blue: createDecorator({ color: 'rgb(0, 0, 187)' }),
  magenta: createDecorator({ color: 'rgb(187, 0, 187)' }),
  cyan: createDecorator({ color: 'rgb(0, 187, 187)' }),
  white: createDecorator({ color: 'white' }),
  gray: createDecorator({ color: 'rgb(125, 125, 125)' }),
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
    if (typeof console === 'undefined') {
      return false;
    }

    const finalStylesList = [];
    const objects = [];
    let finalText = '';

    inputs.forEach((input: any) => {
      let data: ?DecoratorData = null;

      if (input instanceof DecoratorData) {
        data = input;
      } else if (typeof input === 'string' || input instanceof String) {
        data = new DecoratorData(input);
      } else {
        objects.push(input);
      }

      if (data) {
        const { text, stylesList }: DecoratorData = data;

        finalText += text;
        finalStylesList.push(...stylesList.map((styles: any): string => (
          Object.keys(styles).reduce((acc: string, key: string): string => (
            `${acc}${key}:${styles[key]};`
          ), '')
        )));
      }
    });

    if (finalText) {
      console.log(finalText, ...finalStylesList, ...objects);
    } else {
      console.log(...objects);
    }

    return true;
  }
}
