import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map,scan } from 'rxjs/operators';

/*
Objectives:
1. must segregate state from actions from side effects
2. should add numbers when click the button
3. should subtract numbers when click the button
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

  // state$: Observable<AppState> = of({...this.initialState});
  state$: Observable<AppState> = this.actions$.pipe(
     scan((state: AppState, action: Action) => {
      switch (action) {
        case Action.Add:
          return { ...state, count: state.count + 1 };
      }
      return state;
    }, {...this.initialState}),
  );

}
