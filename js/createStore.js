import { Subject } from 'rxjs';
import { scan, startWith, shareReplay } from 'rxjs/operators';

const initialState = {
  count: 0
};

const createStore = reducer => {
  const action$ = new Subject();

  const store$ = action$.pipe(
    startWith({ type: '__INIT__' }),
    scan((state = initialState, action) => {
      const handlers = {
        INCREMENT: state => ({ ...state, count: state.count + 1 }),
        DECREMENT: state => ({ ...state, count: state.count - 1 }),
        ADD: (state, action) => ({ ...state, count: state.count + action.payload }),
        DEFAULT: state => state
      };
      const handler = handlers[action.type] || handlers.DEFAULT;
      return handler(state, action);
    }, undefined),
    shareReplay(1)
  );

  store$.action$ = action$;
  store$.dispatch = action => action$.next(action);

  return store$;
};

export default createStore;
