import { useSelector } from "react-redux";
import { RootState } from "..";
import { useDispatch } from "react-redux";
import { AlertType } from "./types";
import { appSetAlert } from "./reducer";

export const appSelector = (state: RootState) => state.app;

export const useAppState = () => useSelector(appSelector);

export const useAppActions = () => {
  const dispatch = useDispatch();
  const onSetAlert = (a: AlertType | null) => {
    dispatch(appSetAlert(a));
  };

  return {
    onSetAlert,
  };
};
