import React from "react";

import FilmCard from "./FilmCard";
import SearchDetails from "./SearchDetails";

import { FilmTypes } from "../constants/types";
import styles from "../styles/FilmList.module.css";

type FilmListProps = {
  filmsList: FilmTypes[];
  searchContext: string;
};

const FilmList: React.FC<FilmListProps> = ({ filmsList, searchContext }) => {
  return (
    <>
      <div className={styles.cardsWrapper}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Your films list for your search:</h3>
          <SearchDetails list={searchContext} />
        </div>
        <ul className={styles.cardsList}>
          {filmsList.map(film => (
            <li key={film.episode_id} className={styles.cardItem}>
              <FilmCard film={film} searchContext={searchContext} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FilmList;
