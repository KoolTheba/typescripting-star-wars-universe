import React, { useState, useReducer, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import { removeSpaces, removeSpecialChars } from "../utils/searchValueParsers";
import searchByTerm from "../utils/searchByTerm";

import fetchPostReducer from "../hooks/fetchPostReducer";

import FilmList from "./FilmList";
import Instructions from "./Instructions";
import styles from "../styles/FilmSearch.module.css";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const FilmSearch: React.FC = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(fetchPostReducer, initialState);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const searchValueRef = useCallback(() => {
    if (router.query.search) {
      setSearchValue(String(router.query.search));
      setIsSubmitted(true);
    }
  }, [router.query.search]);

  useEffect(() => {
    const searchValuesList =
      searchValue.length > 0 ? removeSpaces(searchValue).split(" ") : [];

    const fetchFilmList = () => {
      dispatch({ type: "loading" });

      Promise.all(searchValuesList.map((el) => searchByTerm(el, dispatch)))
        .then((arr) => {
          return arr.reduce((p, c) => p.filter((e: any) => c.includes(e)));
        })
        .then((commomFilms) => {
          return Promise.all(
            commomFilms.map((url: string) =>
              fetch(url).then((res) => res.json())
            )
          );
        })
        .then((data) => {
          dispatch({ type: "fetchComplete", data });
          setSearchValue("");
          setIsSubmitted(false);
        })
        .catch((error) => {
          dispatch({ type: "error", error });
          setSearchValue("");
          setIsSubmitted(false);
        });
    };

    isSubmitted && fetchFilmList();
  }, [isSubmitted, searchValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setSearchValue(removeSpecialChars(e.target.value));
    }
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchValue.length > 0) {
      setIsSubmitted(true);

      const parserNoChars = removeSpecialChars(searchValue);
      const parsedSearchValue = removeSpaces(parserNoChars);
      router.push({
        pathname: "/",
        query: { search: parsedSearchValue },
      });
    }
  };

  const { loading, data, error } = state;

  return (
    <>
      <Instructions />
      <form className={styles.form}>
        <input
          className={styles.formInput}
          required={true}
          minLength={1}
          type="text"
          name="search"
          placeholder="Search by title, character or planet..."
          value={searchValue}
          onChange={handleChange}
          ref={searchValueRef}
        />
        <button className={styles.ctaButton} onClick={handleSearch}>
          Go!
        </button>
      </form>

      {loading && (
        <span className={styles.loading}>
          Working the Force is...not hurry you must be!
        </span>
      )}
      {error && (
        <span data-testid="error" className={styles.error}>
          No films we found. Search again!
        </span>
      )}
      {data && (
        <FilmList
          filmsList={data}
          searchContext={String(router.query.search)}
        />
      )}
    </>
  );
};

export default FilmSearch;
