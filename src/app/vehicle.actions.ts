import {Action} from '@ngrx/store';
export enum VehicleActionTypes {
  Add = '[Vehicle Component] Add',
  Remove = '[Vehicle Component] Remove'
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class VehicleAdd implements ActionEx {
  readonly type = VehicleActionTypes.Add;
  constructor(public payload: any) {
  }
}
export class VehicleRemove implements ActionEx {
  readonly type = VehicleActionTypes.Remove;
  constructor(public payload: any) {
  }
}
