/* @flow */

import Rx from 'rx';

const upInputs = [38, 75];
const downInputs = [40, 74];
const leftInputs = [37, 72];
const rightInputs = [39, 76];

const mappings = [
  [upInputs, 'up'],
  [downInputs, 'down'],
  [leftInputs, 'left'],
  [rightInputs, 'right'],
];

export function makeKeyboardDriver(): () => Rx.Observable<KeyboardDirection> {
  return function keyboardDriver() {
    return Rx.Observable.fromEvent(window, 'keydown')
      .map(({keyCode}) => {
        for (let i = 0; i < mappings.length; i++) {
          const [inputs, direction] = mappings[i];

          if (inputs.indexOf(keyCode) !== -1) {
            return direction;
          }
        }
      });
  }
}
