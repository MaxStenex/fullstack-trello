import React, { useReducer, useContext } from "react";
import { authReducer, AuthStateType } from "./reducer";

const UserStateContext = React.createContext<AuthStateType>({
  user: null,
  loading: false,
});
const UserDispatchContext = React.createContext<React.Dispatch<any>>(() => null);

type AuthProviderProps = {
  children: React.ReactChild;
};

export const useAuhDispatch = () => {
  const dispatch = useContext(UserDispatchContext);

  return dispatch;
};

export const useAuthState = () => {
  const { user, loading } = useContext(UserStateContext);

  return { user, loading };
};

export const UserContext: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, loading: false });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
