import Rx from 'rx';

interface rx$ArrayLike<T> {
  length: number;
  [index: number]: T;
}

interface rx$Observer<T> {
  onNext: (item: T) => void;
  onError: (err: any) => void;
  onCompleted: () => void;
}

type rx$Subscription = Rx.Disposable & {
  unsubscribe: () => void;
}

type rx$DisposeFunction = () => void;

declare module 'rx' {

  declare class Observable<T> {
    static combineLatest<R>(sources: Observable<any>[], selector: (...items: any) => R): Observable<R>;
    static create(constructor: ((observer: rx$Observer<T>) => rx$DisposeFunction)): Observable<T>;
    static empty(): Observable<T>;
    static from(array: T[] | rx$ArrayLike<T>): Observable<T>;
    static fromEvent<R>(target: any, key: string): Observable<R>;
    static merge<R>(...sources: Observable<R>[]): Observable<R>;
    static just(item: T): Observable<T>;

    do(f: (item: T) => any): Observable<T>;
    map<R>(f: (item: T) => R): Observable<R>;
    scan<R>(f: (prev: R, next: T) => R): Observable<R>;
    skip(count: number): Observable<T>;
    startWith(init: any): Observable<T>;
    take(count: number): Observable<T>;

    subscribe(
      onNextOrSubject?: ((item: T) => any) | Subject,
      onError?: (error: any) => any,
      Complete?: (item: T) => any
    ): rx$Subscription;
  }

  declare class Disposable {
    static create: () => Disposable;
    dispose: () => void;
  }

  declare class CompositeDisposable extends Disposable {
    add(item: Disposable): void;
  }

  declare class Subject<T> extends Observable<T> {
    onNext(item: T): void;
  }

  declare class ReplaySubject<T> extends Subject<T> {
    constructor(count: number): Observable<T>;
  }
}
