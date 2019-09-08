
import {
  EMPTY,
  fromEvent,
} from "rxjs";
import {
  filter,
  tap,
  map,
  mergeMap,
  switchMap,
  catchError,
  debounceTime,
  distinctUntilChanged,
  share,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
const github_url = "https://api.github.com/search/users?q="

import createStore from './createStore';
import reducer from './reducer';

const store$ = createStore(reducer);

store$.subscribe(
  state => console.log(state) || (result.textContent = JSON.stringify(state, null, 2))
);

fromEvent(document.getElementById('increment'), 'click')
  .pipe(map(() => ({ type: 'INCREMENT' })))
  // pushing -> {type: "INCREMENT"}
  .subscribe(store$.action$); 

fromEvent(document.getElementById('plus5'), 'click')
  .pipe(map(() => ({ type: 'ADD', payload: 5 })))
  .subscribe(store$.action$);

fromEvent(document.getElementById('decrement'), 'click')
  .pipe(map(() => ({ type: 'DECREMENT' })))
  .subscribe(store$.action$);



const searchInput$ = fromEvent(document.getElementById("search"), "input")
  .pipe(
    map(e => e.target.value),
    debounceTime(1000), // runs after 1 second of idle time
    distinctUntilChanged(), // makes sure there is a change in the request value
    tap(() => (result.textContent = "")),
    filter(query => !!query), // not empty search
    switchMap(query =>
      ajax.getJSON(`${github_url}${query}`).pipe(catchError(err => EMPTY))
    ),
    share() // if subscription is shared, network requests will only be made once.
)

// Subscribe to searchInput$ stream.
searchInput$.pipe(
  map(rsp => rsp.total_count),
  map(count => ({ type: 'RESULTS_COUNT', payload: count }))
).subscribe(store$.action$)

searchInput$.pipe(
  map(rsp => rsp.items),
  map(users => ({ type: 'RESULTS', payload: users })),
).subscribe(store$.action$)