import { Subject } from 'rxjs';
import { scan, startWith, shareReplay } from 'rxjs/operators';

const createStore = reducer => {

  // Subject is the action stream observable.
  // Stream of Actions being emmitted which is the result of a subject
  const action$ = new Subject();

  // store$ is the result of working with the current state and the action
  const store$ = action$.pipe(
    // Initiate our reducer with calling INI action
    startWith({ type: '__INIT__' }),
    // You can create Redux-like state management with scan!
    // Scan is a reducer over time.
    // State -> Action -> New State
    // Scan computes the current state
    // scan initializes the reducer with undefined which will load the INITIAL_STATE
    scan(reducer, undefined),
    // This is application wide state
    // With shareReplay, Any late or new subscribers will have access to the last version of the state
    shareReplay(1)
  );

  // add the action stream to the store
  store$.action$ = action$;
  // Dispatches actions onto the stream
  store$.dispatch = action => action$.next(action);

  return store$;
};

export default createStore;
