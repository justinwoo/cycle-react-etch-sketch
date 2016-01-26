type Config = {
  width: number,
  height: number,
  increment: number
};

type Coords = {
  x: number,
  y: number
};

type State = {
  points: {[key: string]: Coords},
  cursor: Coords
};

type Props = Config & State;

type Project = (state: State) => State;
type Projects = Rx.Observable<Project>;

type KeyboardDirection =
  'up' |
  'down' |
  'left' |
  'right' |
  void;

type KeyboardSource = Rx.Observable<KeyboardDirection>

type BoardClear$ = Rx.Observable<void>;

type ReactSource = {
  boardClear$: BoardClear$
}

type Drivers = {
  keyboard: KeyboardSource,
  react: ReactSource
};

type Intents = {
  keyboardDirection$: KeyboardSource,
  boardClear$: BoardClear$
};
