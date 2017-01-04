/* @flow */

export type Styles = {
  color?: string;
  background?: string;
  weight?: string;
  style?: string;
  inverse?: boolean;
  hidden?: boolean;
  decoration?: string;
};

export const stylesCollection: {
  [key: string]: Styles;
} = {
  black: { color: 'black' },
  red: { color: 'red' },
  green: { color: 'green' },
  yellow: { color: 'yellow' },
  blue: { color: 'blue' },
  magenta: { color: 'magenta' },
  cyan: { color: 'cyan' },
  white: { color: 'white' },
  gray: { color: 'gray' },
  bgBlack: { background: 'black' },
  bgRed: { background: 'red' },
  bgGreen: { background: 'green' },
  bgYellow: { background: 'yellow' },
  bgBlue: { background: 'blue' },
  bgMagenta: { background: 'magenta' },
  bgCyan: { background: 'cyan' },
  bgWhite: { background: 'white' },
  bold: { weight: 'bold' },
  dim: { weight: 'dim' },
  italic: { style: 'italic' },
  inverse: { inverse: true },
  hidden: { hidden: true },
  strikethrough: { decoration: 'strikethrough' },
  underline: { decoration: 'underline' },
};

export class Data {
  styles: Styles;
  text: ?string;

  constructor(
    innerText: ?string = null,
    innerStyles: Styles = {},
  ) {
    this.text = innerText;
    this.styles = innerStyles;
  }

  assignStyle(innerStyles: Styles): this {
    this.styles = {
      ...this.styles,
      ...innerStyles,
    };
    return this;
  }

  setText(innerText: string): this {
    this.text = innerText;
    return this;
  }
}

export function createProperties(): any {
  const properties = {};

  Object.keys(stylesCollection).forEach((key: string) => {
    function builder(data: Data = new Data()): Function {
      data.assignStyle(stylesCollection[key]);

      function fn(input: string): Data {
        return data.setText(input);
      }

      fn.data = data;
      Object.defineProperties(fn, properties);

      return fn;
    }

    properties[key] = {
      // eslint-disable-next-line object-shorthand, func-names
      get: function (): any {
        return builder(this.data);
      }
    };
  });

  return properties;
}
