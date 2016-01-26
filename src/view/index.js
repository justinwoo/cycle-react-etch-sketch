/* @flow */

import Rx from 'rx';
import React from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';

import {clearBoard} from '../drivers/react'

function shallowCompare(inst, nextProps, nextState) {
  return !shallowEqual(inst.props, nextProps) || !shallowEqual(inst.state, nextState);
}

class Block extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const {increment} = this.props;

    return (
      <rect
        key={this.props.key}
        x={increment * this.props.coords.x}
        y={increment * this.props.coords.y}
        width={increment}
        height={increment}
      />
    );
  }
}

class Board extends React.Component {
  drawPath() {
    const state: State = this.props.state;
    const {points} = state;
    const elements = [];

    for (let key in points) {
      if (points.hasOwnProperty(key)) {
        elements.push(
          <Block
            key={key}
            increment={this.props.increment}
            coords={points[key]}
          />
        );
      }
    }

    return elements;
  };

  drawCursor(){
    return (
      <Block
        key="cursor"
        increment={this.props.increment}
        coords={this.props.state.cursor}
      />
    );
  };

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        {this.drawPath()}
        {this.drawCursor()}
      </svg>
    );
  }
}

export function view(state$: Rx.Observable<Props>): Rx.Observable<ReactElement> {
  return state$.map(state => (
      <div>
        <button onClick={clearBoard}>Clear the board</button>
        <div style={{border: '1px solid black', width: state.width, height: state.height}}>
          <Board
            state={state}
            width={state.width}
            height={state.height}
            increment={state.increment}
          />
        </div>
      </div>
    )
  );
}
