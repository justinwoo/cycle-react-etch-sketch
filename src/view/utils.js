import shallowEqual from 'fbjs/lib/shallowEqual';

export function shallowCompare(inst, nextProps, nextState) {
  return !shallowEqual(inst.props, nextProps) || !shallowEqual(inst.state, nextState);
}
