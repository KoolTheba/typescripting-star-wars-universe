import React from "react";
import Link from "next/link";
import moment from "moment";

import styles from "../styles/FilmCard.module.css";
import { FilmTypes } from "@/constants/types";

type FilmCardTypes = {
  film: FilmTypes;
  searchContext: string;
};

const FilmCard: React.FC<FilmCardTypes> = ({ film, searchContext }) => {
  const originalDate = moment(film.release_date);
  const today = moment();
  const yearsPassed = today.diff(originalDate, "years");

  return (
    <>
      <Link
        href={`/film/${encodeURIComponent(
          film.episode_id
        )}/?search=${searchContext}`}
      >
        <p data-testid="titleParagraph" className={styles.cardInfo}>
          {film.title}
        </p>
        <p
          data-testid="episodeParagraph"
          className={styles.cardInfo}
        >{`Episode ${film.episode_id}`}</p>
        <p data-testid="dateParagraph" className={styles.cardInfo}>
          {film.release_date} {`(${yearsPassed} years ago)`}
        </p>
      </Link>
    </>
  );
};

export default FilmCard;
