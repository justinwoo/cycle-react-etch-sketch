/* @flow */

import Rx from 'rx';
import React from 'react';
import ReactDOM from 'react-dom';

export function makeReactDriver<T>(
  containerId: string,
  childContextTypes: any,
  getChildContext: () => {[key: string]: () => void},
  source: T
): (elements$: Rx.Observable<ReactElement>) => T {
  const container = document.getElementById(containerId);
  const ContextProvider = React.createClass({
    childContextTypes,
    getChildContext,
    render() {
      return this.props.children;
    }
  });

  return function reactDriver(element$: Rx.Observable<ReactElement>) {
    element$.subscribe(
      (element) =>
        ReactDOM.render(
          <ContextProvider>
            {element}
          </ContextProvider>,
          container
        ),
      (err) => console.error('Error occured while rendering React', err)
    );

    return source;
  }
}
