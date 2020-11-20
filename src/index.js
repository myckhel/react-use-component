import React, {useState, useRef} from 'react'

const merge = (a, b) => Object.assign({}, a, b)

export const useMergeState = (initialState) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(state)
  ref.current = state

  const setMergedState = (newState, callback) => {
    setState((prevState) =>
    typeof newState === 'function'
      ? newState(ref.current)
      : merge(prevState, newState)
    );
    callback && callback(state);
  };

  return [state, setMergedState, ref];
};

export const useComponent = (p) => {
  const {state, props = {}, ...rest} = p
  const ref = useRef(rest)
  const [_state, setState] = useMergeState(state)
  ref.current.state = _state
  ref.current.props = props
  ref.current.setState = setState

  return ref.current
}
