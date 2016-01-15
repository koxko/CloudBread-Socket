import fetch from 'lib/fetch';

export const LOAD_PAGE = 'LOAD_PAGE';
export const LOAD_PAGE_LOADING = 'LOAD_PAGE_LOADING';
export const LOAD_PAGE_SUCCESS = 'LOAD_PAGE_SUCCESS';
export const LOAD_PAGE_ERROR = 'LOAD_PAGE_ERROR';
export const UNLOAD_PAGE = 'UNLOAD_PAGE';

const initialState = {
  isLoading: false,
  content: '',
  title: '',
  error: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PAGE_LOADING:
      return {
        ...state,
        isLoading: true,
        title: '',
        content: '',
        error: '',
      };
    case LOAD_PAGE_ERROR:
      const { error } = action.payload.error;
      return {
        ...state,
        isLoading: false,
        error,
      };
    case LOAD_PAGE_SUCCESS:
      const { content, title } = action.payload.body;
      return {
        ...state,
        isLoading: false,
        content,
        title,
      };
    case UNLOAD_PAGE:
      return {
        ...state,
        content: '',
        title: '',
        error: '',
      };
    default:
      return state;
  }
}

export function unloadPage() {
  return {
    type: UNLOAD_PAGE,
  };
}

export function loadPage({ pageId }) {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_PAGE_LOADING,
      });
      const res = await fetch.get(`content/${pageId}`);
      if (res.error) {
        throw res.error;
      }
      return dispatch({
        type: LOAD_PAGE_SUCCESS,
        payload: res,
      });
    } catch (error) {
      return dispatch({
        type: LOAD_PAGE_ERROR,
        payload: {
          error,
        },
      });
    }
  };
}
