import { Subject } from 'rxjs';
import { scan, startWith, shareReplay } from 'rxjs/operators';

const createStore = reducer => {

  // Subject is our hot observable.
  const action$ = new Subject();

  const store$ = action$.pipe(
    // Initiate our reducer with calling INI action
    startWith({ type: '__INIT__' }),
    // You can create Redux-like state management with scan!
    // Scan is a reducer over time.
    // State -> Action -> New State
    scan(reducer, undefined),
    //Any late subscribers will have access to the last state
    shareReplay(1)
  );

  // add the action stream to the store
  store$.action$ = action$;
  store$.dispatch = action => action$.next(action);

  return store$;
};

export default createStore;
