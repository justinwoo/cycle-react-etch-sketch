/* @flow */

export function intent(drivers: Drivers): Intents {
  const keyboardDirection$ = drivers.keyboard;
  const {boardClear$} = drivers.react;

  return {
    keyboardDirection$,
    boardClear$
  };
}
