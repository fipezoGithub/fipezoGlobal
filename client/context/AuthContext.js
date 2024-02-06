import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();
const INITIAL_STATE = {
  userDetails: null,
  userType: "",
  isLoggedIn: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "isLoggedIn": {
      return { ...state, isLoggedIn: true };
    }
    case "login": {
      return {
        ...state,
        userDetails: action.payload.userDetails,
        userType: action.payload.userType,
        isLoggedIn: true,
      };
    }
    case "logout": {
      return {
        ...state,
        userDetails: null,
        userType: "",
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    const getData = async () => {
      if (token && !state.userDetails) {
        const res = await fetch(`${process.env.SERVER_URL}/navbar`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        let type;
        if (data.user.companyname) {
          type = "company";
        } else if (!data.user.companyname && data.user.uid) {
          type = "freelancer";
        } else {
          type = "user";
        }
        dispatch({
          type: "login",
          payload: {
            userDetails: data.user,
            userType: type,
            isLoggedIn: true,
          },
        });
      }
    };
    getData();
  }, [state.isLoggedIn]);

  return (
    <AuthContext.Provider value={{ data: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
