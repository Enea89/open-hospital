import { DoctorFilterDTO } from "@generated/axios";
import { Reducer } from "react";

export interface Action {
  type: "SET_FILTER";
  payload?: DoctorFilterDTO;
}

export const doctorsFilterReducer: Reducer<DoctorFilterDTO, Action> = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload ? { ...action.payload } : {};
    default:
      return state;
  }
};
