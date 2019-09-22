import { Component } from '@angular/core';
import { BehaviorSubject, Observable,merge, defer,of, interval } from 'rxjs';
import { map,scan, filter, switchMap, tap } from 'rxjs/operators';

/*
Objectives:
1. must segregate state from actions from side effects x
2. should add numbers when click the button x
3. should subtract numbers when click the button x
4. should reset the counter when click the button
5. should start the counter when click the button
6. should pause the counter when click the button
*/

enum Action {
  Start,
  Pause,
  Reset,
  Add,
  Subtract,
}

interface AppState {
  count: number,
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  private initialState: AppState = {
    count: 0,
  };

  actionType = Action;
  actions$ = new BehaviorSubject(Action.Reset);

  state$: Observable<AppState> = merge(
    this.actions$,
    defer(() =>this.timeCtrl$)
  ).pipe(
     scan((state: AppState, action: Action) => {
      switch (action) {
        case Action.Add:
          return { ...state, count: state.count + 1 };
        case Action.Subtract:
          return { ...state, count: state.count - 1 };
        case Action.Reset:
          return { ...state, ...this.initialState};
      }
      return state;
    }, {...this.initialState}),
  );

  timeCtrl$ = this.actions$.pipe(
    filter((action)=>{
      return (action == Action.Start) || (action == Action.Pause)
    }),
    switchMap( (action) => interval(1000).pipe(
      filter(() => action != Action.Pause)
    )),
    map(() => {
      return Action.Add;
    })
  )
}
