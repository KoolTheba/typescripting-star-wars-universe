import React from "react";

import { arrayHandler } from "../utils/arrayTransform";

import styles from "../styles/SearchDetails.module.css";

type SearchDetailsProps = {
  list: string;
}

const SearchDetails:React.FC<SearchDetailsProps> = ({ list }) => {
  const searchList = list && arrayHandler(list);
  return (
    <>
      <div className={styles.contextWrapper}>
        {searchList && searchList.map((el, index) => (
          <span role="text" key={index} className={styles.context}>
            {el}
          </span>
        ))}
      </div>
    </>
  );
};

export default SearchDetails;
