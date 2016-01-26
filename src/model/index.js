/* @flow */

const config = {
  width: 800,
  height: 600,
  increment: 10
};

const initialState: State = {
  points: {},
  cursor: {
    x: 0,
    y: 0
  }
};

function addPoint(state: State): State {
  const cursorX = state.cursor.x;
  const cursorY = state.cursor.y;
  const newPoint = `${cursorX},${cursorY}`;

  if (state.points.hasOwnProperty(newPoint)) {
    return state;
  } else {
    const newPoints = Object.assign({}, state.points);

    newPoints[newPoint] = {
      x: cursorX,
      y: cursorY
    };

    return Object.assign({}, state, {
      points: newPoints
    });
  }
}

function moveCursor(keyboard$): Projects {
  return keyboard$
    .map((direction) =>
      (state) => {
        if (!direction) return state;

        const {points} = addPoint(state);
        const {increment, width, height} = state;
        let {x: cursorX, y: cursorY} = state.cursor;

        switch (direction) {
          case 'up':
            cursorY--;
            break;
          case 'down':
            cursorY++;
            break;
          case 'left':
            cursorX--;
            break;
          case 'right':
            cursorX++;
            break;
        }

        if (cursorX < 0 || (increment * cursorX) > (width - increment) ||
            cursorY < 0 || (increment * cursorY) > (height - increment)) {
          return state;
        }

        return Object.assign({}, state, {
          points,
          cursor: {
            x: cursorX,
            y: cursorY
          }
        });
  });
}

function boardClear(boardClear$: BoardClear$): Projects {
  return boardClear$.map(() => (state) => Object.assign({}, state, {
    points: {}
  }));
}

export function model(actions: Intents): Rx.Observable<Props> {
  const config$ = Rx.Observable.just(config);
  const state$ = Rx.Observable
    .merge(
      moveCursor(actions.keyboardDirection$),
      boardClear(actions.boardClear$)
    )
    .startWith(initialState)
    .scan((state, project) => project(state));

  return Rx.Observable.combineLatest(
    [config$, state$],
    (config, state) => {
      return Object.assign({}, config, state);
    });
}
