import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import SearchDetails from "./SearchDetails";

import styles from "../styles/FilmDetails.module.css";

type FilmDetailsTypes = {
  title: string;
  director: string;
  producer: string;
  release_date: string;
}

type QueryTypes = {
  filmId: string;
  search: string;
}

const FilmDetails:React.FC = () => {
  const router = useRouter();
  const query = router.query;
  const { filmId, search } = query as QueryTypes;

  const [filmDetails, setFilmDetails] = useState<FilmDetailsTypes | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (filmId) {
      const filmUrl = `https://swapi.dev/api/films/${parseInt(filmId)}`;

      fetch(filmUrl)
        .then((res) => res.json())
        .then((data) =>
          data.detail ? setError(data.detail) : setFilmDetails(data)
        )
        .catch((err) => setError(err));
    }
  }, [filmId]);

  if (error) {
    return (
      <>
        <div className={styles.errorContainer}>
          <span data-testid="errorMessage" role="text" className={styles.error}>
            Danger! An error we had
          </span>
          <Link href={"/"}>
            <button className={styles.homeButton}>Take me back Home</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      {filmDetails && (
        <>
          <button
            className={styles.backButton}
            type="button"
            onClick={() => {
              router.push({
                pathname: "/",
                query: { search },
              });
            }}
          >
            Back to results
          </button>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{filmDetails.title}</h1>
            <p data-testid="episodeParagraph" className={styles.subtitle}>
              Episode: {filmId}
            </p>
          </div>
          <div className={styles.searchTermsWrapper}>
            <SearchDetails list={search} />
          </div>
          <div className={styles.filmDetailsWrapper}>
            <div className={styles.specialWrapper}>
              <p data-testid="directorParagraph">
                Director: {filmDetails.director}
              </p>
              <p data-testid="producerParagraph">
                Producer: {filmDetails.producer}
              </p>
            </div>
            <p data-testid="dateParagraph">
              Release date:{" "}
              {filmDetails.release_date &&
                filmDetails.release_date.split("-").reverse().join("-")}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FilmDetails;
