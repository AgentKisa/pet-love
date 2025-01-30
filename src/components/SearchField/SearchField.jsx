"use client";

import { fetchNews } from "@/redux/newsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchField = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchNews({ keyword }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for something..."
      />
      <button type="submit">🔍</button>
      {keyword && (
        <button type="button" onClick={() => setKeyword("")}>
          ❌
        </button>
      )}
    </form>
  );
};

export default SearchField;
