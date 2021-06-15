import familyAxios from "../../axios/familyAxios";
import authAxios from "../../axios/authAxios";
import types from "../types";
import useAxios from "../../hooks/useAxios";
import useLocalStorage from "../../hooks/useLocalStorage";

export const registerFamilyAndUser = (formValues) => {
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
        throw new Error({ message: "Family could not be registered" });
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

async function registerFamily(familyAxiosWrapper, familyData) {
  const family = await familyAxiosWrapper.postRequest("/", familyData);
  return family;
}

async function registerUser(authAxiosWrapper, userData, familyId) {
  const user = await authAxiosWrapper.postRequest(
    `/${familyId}/user/register`,
    userData
  );
  return user;
}

async function loginUser(authAxiosWrapper, loginData) {
  const authenticationInformation = await authAxiosWrapper.postRequest(
    "/user/login",
    loginData
  );

  return authenticationInformation;
}
