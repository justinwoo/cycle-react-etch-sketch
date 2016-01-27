/* @flow */

import Rx from 'rx';
import React from 'react';
import {App} from './app';

const boardClear$ = new Rx.Subject();

export const childContextTypes = {
  boardClear$: React.PropTypes.any
};

export function getChildContext(): any {
  return {
    boardClear$
  };
};

export const source = {
  boardClear$
};

export function view(state$: Rx.Observable<Props>): Rx.Observable<ReactElement> {
  return state$.map(state => <App state={state}/>);
}
