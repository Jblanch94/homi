import familyAxios from "../../axios/familyAxios";
import authAxios from "../../axios/authAxios";
import types, { AppThunk } from "../types";
import useAxios from "../../hooks/useAxios";
import useLocalStorage from "../../hooks/useLocalStorage";
import { History } from "history";

interface IFormValues {
  familyName: string;
  familyPassword: string;
  email: string;
  userName: string;
  age?: number;
  profileAvatar?: string;
}

interface IFamilyData {
  name: string;
  password: string;
}

interface IUserData {
  email: string;
  name: string;
  age?: number;
  profileAvatar?: string;
}

interface ILoginData {
  email: string;
  password: string;
}

export const registerFamilyAndUser = (formValues: IFormValues): AppThunk => {
  return async (dispatch) => {
    const familyAxiosWrapper = useAxios(familyAxios);
    const authAxiosWrapper = useAxios(authAxios);
    const { setDataInLocalStorage } = useLocalStorage();

    try {
      dispatch({ type: types.IS_LOADING, payload: true });
      const familyData = {
        name: formValues.familyName,
        password: formValues.familyPassword,
      };
      const family = await registerFamily(familyAxiosWrapper, familyData);
      const familyId = family.data.data?.id;

      if (familyId === null) {
        throw new Error("Family could not be registered");
      }

      const userData = {
        email: formValues.email,
        name: formValues.userName,
        age: formValues?.age,
        profileUrl: formValues?.profileAvatar,
      };

      const user = await registerUser(authAxiosWrapper, userData, familyId);

      const loginData = {
        email: formValues.email,
        password: formValues.familyPassword,
      };
      const authenticationInformation = await loginUser(
        authAxiosWrapper,
        loginData
      );

      // Dispatch actions to update state after registering family, user and getting authentication status
      if (authenticationInformation.data.success) {
        setDataInLocalStorage("auth", {
          isAuthenticated: true,
          accessToken: authenticationInformation.data.data,
        });
        dispatch({ type: types.REGISTER_FAMILY, payload: family.data.data });
        dispatch({ type: types.REGISTER_USER, payload: user.data.data });
        dispatch({
          type: types.LOGIN_USER,
          payload: authenticationInformation.data.data,
        });
      }
    } catch (err) {
      console.log(err.response);
      console.error(err);
      setDataInLocalStorage("auth", {
        isAuthenticated: false,
        accessToken: null,
      });
      dispatch({ type: types.AUTH_ERROR, payload: err.response.data.msg });
    } finally {
      dispatch({ type: types.IS_LOADING, payload: false });
    }
  };
};

async function registerFamily(
  familyAxiosWrapper: ReturnType<typeof useAxios>,
  familyData: IFamilyData
) {
  const family = await familyAxiosWrapper.postRequest("/", familyData);
  return family;
}

async function registerUser(
  authAxiosWrapper: ReturnType<typeof useAxios>,
  userData: IUserData,
  familyId: number
) {
  const user = await authAxiosWrapper.postRequest(
    `/${familyId}/user/register/`,
    userData
  );
  return user;
}

async function loginUser(
  authAxiosWrapper: ReturnType<typeof useAxios>,
  loginData: ILoginData
) {
  const authenticationInformation = await authAxiosWrapper.postRequest(
    "/user/login",
    loginData
  );

  return authenticationInformation;
}

export const login = (formValues: ILoginData, history: History): AppThunk => {
  return async (dispatch) => {
    const authAxiosWrapper = useAxios(authAxios);
    try {
      dispatch({ type: types.IS_LOADING, payload: true });
      const authenticatedUser = await loginUser(authAxiosWrapper, formValues);

      if (authenticatedUser.data.success) {
        dispatch({
          type: types.LOGIN_USER,
          payload: authenticatedUser.data.data,
        });

        window.localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: authenticatedUser.data.data.accessToken,
            isAuthenticated: true,
          })
        );

        // after successful login navigate user to dashboard
        history.push("/family");
      }
    } catch (err) {
      console.error(err.response.data.msg);
      window.localStorage.removeItem("auth");
      dispatch({ type: types.AUTH_ERROR, payload: err.response.data.msg });
    } finally {
      dispatch({ type: types.IS_LOADING, payload: false });
    }
  };
};

export const refreshToken = (): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(authAxios);
    try {
      const response = await axios.postRequest("/user/refresh-token");
      if (response.status >= 200 && response.status < 400) {
        window.localStorage.setItem(
          "auth",
          JSON.stringify({
            isAuthenticated: true,
            accessToken: response.data.data.accessToken,
          })
        );
        return dispatch({
          type: types.AUTH_REFRESH_TOKEN,
          payload: response.data.data,
        });
      }
      throw new Error("Could not get refresh token");
    } catch (err) {
      console.error(err);
      window.localStorage.removeItem("auth");
    }
  };
};
