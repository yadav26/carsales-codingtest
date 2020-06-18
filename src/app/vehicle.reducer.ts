import {ActionEx, VehicleActionTypes} from './vehicle.actions';
export const initialState = [];
export function VehicleReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case VehicleActionTypes.Add:
      return [...state, action.payload];
    case VehicleActionTypes.Remove:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
}