/* @flow */

import Rx from 'rx';
import Cycle from '@cycle/core';

import {makeReactDriver} from './drivers/react';
import {makeKeyboardDriver} from './drivers/keyboard'

import {intent} from './intent';
import {model} from './model';
import {view, childContextTypes, getChildContext, source} from './view';

function main(drivers) {
  const actions$ = intent(drivers);
  const state$ = model(actions$);
  const element$ = view(state$);

  return {
    react: element$
  };
}

let drivers: {
  keyboard: () => KeyboardSource
} = {
  keyboard: makeKeyboardDriver(),
  react: makeReactDriver('app', childContextTypes, getChildContext, source)
};

Cycle.run(main, drivers);
