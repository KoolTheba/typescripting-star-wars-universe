import React from "react";

import FilmCard from "./FilmCard";
import SearchDetails from "./SearchDetails";

import styles from "../styles/FilmList.module.css";

type Film = {
  episode_id: string;
  title: string;
  release_date: string;
};

type FilmListProps = {
  filmsList: Film[];
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
          {filmsList.map((film) => (
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
