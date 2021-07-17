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
        return dispatch({
          type: types.FETCH_CURRENT_USER,
          payload: currentUser.data.data,
        });
      }
      throw new Error("User does not exist");
    } catch (err) {
      console.error(err);
      dispatch({
        type: types.USER_ERROR,
        payload: err.response?.msg || err,
      });
    }
  };
};

export const fetchUserProfiles = (familyId: number): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(familyAxios);
    try {
      const auth = JSON.parse(window.localStorage.getItem("auth") || "{}");
      const token = auth.accessToken;

      if (token) {
        const family = await axios.getRequest(`/${familyId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        return dispatch({
          type: types.FETCH_USER_PROFILES,
          payload: family.data.data.users,
        });
      }
      dispatch({ type: types.USER_ERROR, payload: "User not found" });
    } catch (err) {
      console.error(err.response.msg);
      dispatch({ type: types.USER_ERROR, payload: err.response.msg });
    }
  };
};

export const registerUser = (values: IRegisterUser): AppThunk => {
  return async (dispatch) => {
    const axios = useAxios(userAxios);
    const auth = JSON.parse(window.localStorage.getItem("auth") || "{}");
    const token = auth.accessToken;
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
        dispatch({
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
