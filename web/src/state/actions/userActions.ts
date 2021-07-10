import useAxios from "../../hooks/useAxios";
import userAxios from "../../axios/userAxios";
import familyAxios from "../../axios/familyAxios";
import types, { AppThunk } from "../types";

interface IRegisterUser {
  name: string;
  email: string;
  age?: number;
  admin: boolean;
  familyId: number;
}

export const fetchCurrentUser = (): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(userAxios);
    try {
      const currentUser = await axios.getRequest("/");

      const userId: number = currentUser.data.data?.id;

      // if current user has a valid id and family id exists then query for the family data
      if (userId) {
        dispatch({
          type: types.FETCH_CURRENT_USER,
          payload: currentUser.data.data,
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: types.USER_ERROR, payload: err.response.msg });
    }
  };
};

export const fetchUserProfiles = (familyId: number): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(familyAxios);
    try {
      const family = await axios.getRequest(`/${familyId}`, {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(window.localStorage.getItem("auth"))?.accessToken,
        },
      });

      dispatch({
        type: types.FETCH_USER_PROFILES,
        payload: family.data.data.users,
      });
    } catch (err) {
      console.error(err.response.msg);
      dispatch({ type: types.USER_ERROR, payload: err.response.msg });
    }
  };
};

export const registerUser = (values: IRegisterUser): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(userAxios);
    const token = JSON.parse(window.localStorage.getItem("auth"))?.accessToken;
    try {
      if (token) {
        const newUser = await axios.postRequest(
          `/register/family/${values.familyId}`,
          values,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return dispatch({
          type: types.REGISTER_USER,
          payload: newUser.data.data,
        });
      }
      throw new Error("User could not be authenticated");
    } catch (err) {
      console.error(err);
    }
  };
};
