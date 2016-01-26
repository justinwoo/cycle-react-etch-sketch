/* @flow */

import Rx from 'rx';
import ReactDOM from 'react-dom';

export const boardClear$ = new Rx.Subject();

export function clearBoard() {
  boardClear$.onNext();
}

export function makeReactDriver(containerId: string):
  (elements$: Rx.Observable<ReactElement>) => ReactSource {
  const container = document.getElementById(containerId);

  return function reactDriver(element$: Rx.Observable<ReactElement>) {
    element$.subscribe(
      (element) => ReactDOM.render(element, container),
      (err) => console.error('Error occured while rendering React', err)
    );

    return {
      boardClear$
    };
  }
}
