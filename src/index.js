/* @flow */

import Rx from 'rx';
import React from 'react';
import Cycle from '@cycle/core';

import {makeReactDriver} from './drivers/react';
import {makeKeyboardDriver} from './drivers/keyboard'

import {intent} from './intent';
import {model} from './model';
import {view} from './view';

function main(drivers) {
  const actions$ = intent(drivers);
  const state$ = model(actions$);
  const element$ = view(state$);

  return {
    react: element$
  };
}

const boardClear$ = new Rx.Subject();

const childContextTypes = {
  boardClear$: React.PropTypes.any
};

function getChildContext(): any {
  return {
    boardClear$
  };
};

const source = {
  boardClear$
};

let drivers = {
  keyboard: makeKeyboardDriver(),
  react: makeReactDriver('app', childContextTypes, getChildContext, source)
};

Cycle.run(main, drivers);
