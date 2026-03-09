function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createStore(initialState) {
  let state = clone(initialState);
  const listeners = new Set();

  function emit() {
    listeners.forEach((listener) => {
      listener(state);
    });
  }

  function getState() {
    return state;
  }

  function setState(nextState) {
    state = clone(nextState);
    emit();
  }

  function update(mutator) {
    const draft = clone(state);
    mutator(draft);
    state = draft;
    emit();
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function reset(nextState = initialState) {
    state = clone(nextState);
    emit();
  }

  return {
    getState,
    setState,
    update,
    subscribe,
    reset,
  };
}
