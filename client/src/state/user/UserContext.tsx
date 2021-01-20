import React, { useReducer, useContext } from "react";
import { authReducer, AuthStateType } from "./reducer";

const UserStateContext = React.createContext<AuthStateType>({ user: null });
const UserDispatchContext = React.createContext<React.Dispatch<any>>(() => null);

type AuthProviderProps = {
  children: React.ReactChild;
};

export const useAuhDispatch = () => {
  const dispatch = useContext(UserDispatchContext);

  return dispatch;
};

export const useAuthState = () => {
  const { user } = useContext(UserStateContext);

  return user;
};

export const UserContext: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
