import { Dispatch } from "react";
import { Action, CharacterInfoTypes } from "@/constants/types";

type ResultsTypes = {
  count: number;
  next: null;
  previous: null;
  results: CharacterInfoTypes[] | [];
};

const searchByTerm = async (term: string, dispatch: Dispatch<Action>) => {
  const urlsList = [
    `https://swapi.dev/api/films?search=${term}`,
    `https://swapi.dev/api/people?search=${term}`,
    `https://swapi.dev/api/planets?search=${term}`,
    `https://swapi.dev/api/starships?search=${term}`,
    `https://swapi.dev/api/vehicles?search=${term}`
  ];

  const results = (await Promise.all(urlsList.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(res => res.json())))
    .catch(error => dispatch({ type: "error", error }))) as ResultsTypes[];

  const result = results.filter(el => el.results.length);

  return result[0].results[0].films
    ? result[0].results[0].films
    : [result[0].results[0].url];
};

export default searchByTerm;
