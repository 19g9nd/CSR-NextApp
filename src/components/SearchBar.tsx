import React, { useEffect } from "react";

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    console.log("Search changed:", search);
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for products..."
        value={search}
        onChange={handleSearchChange}
        style={{
          width: "100%",
          padding: "8px",
          margin: "8px 0",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default SearchBar;
