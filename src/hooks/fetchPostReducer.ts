import { Action } from "@/constants/types";

type FilmDetailsState = {
  loading: boolean;
  data: object | null;
  error: string | null;
};

function fetchPostReducer(state: FilmDetailsState, action: Action) {
  if (action.type === "loading") {
    return {
      loading: true,
      data: null,
      error: null,
    };
  } else if (action.type === "fetchComplete") {
    return {
      loading: false,
      data: action.data,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      loading: false,
      data: null,
      error: "Error searching for films",
    };
  } else {
    throw new Error();
  }
}

export default fetchPostReducer;
