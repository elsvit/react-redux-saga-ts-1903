export const GET_TOKEN: 'auth/GET_TOKEN' = 'auth/GET_TOKEN';
export const GET_TOKEN_SUCCESS: 'auth/GET_TOKEN_SUCCESS' = 'auth/GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAIL: 'auth/GET_TOKEN_FAIL' = 'auth/GET_TOKEN_FAIL';
export const LOGOUT: 'LOGOUT' = 'LOGOUT';

export type AuthApiT =
  | typeof GET_TOKEN
  ;

export type AuthActionT =
  | AuthApiT
  | typeof GET_TOKEN_SUCCESS
  | typeof GET_TOKEN_FAIL
  ;

interface IAuthState {
  isAuthenticated: boolean;
}

export type AuthStateT = Readonly<IAuthState>;

interface IGetTokenAction {
  type: typeof GET_TOKEN;
}

interface IGetTokenSuccessAction {
  type: typeof GET_TOKEN_SUCCESS;
}

interface IGetTokenFailAction {
  type: typeof GET_TOKEN_FAIL;
}

interface ILogoutAction {
  type: typeof LOGOUT;
}

type AuthActions =
  | IGetTokenAction
  | IGetTokenSuccessAction
  | IGetTokenFailAction
  | ILogoutAction
  ;

const initialState: IAuthState = {
  isAuthenticated: true,
};

export default function reducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case GET_TOKEN_SUCCESS:
      return { ...state, isAuthenticated: true };

    case GET_TOKEN_FAIL:
      return { ...state, isAuthenticated: false };

    case LOGOUT:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}

export const getToken = () => ({ type: GET_TOKEN });

export const logOut = () => ({ type: LOGOUT });

export const getTokenSuccess = () => ({
  type: GET_TOKEN_SUCCESS,
});

export const getTokenFail = () => ({
  type: GET_TOKEN_FAIL,
});
