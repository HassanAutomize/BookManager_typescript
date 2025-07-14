import React from "react";

const Search: React.FC<{ globalFilter: string; setGlobalFilter: React.Dispatch<React.SetStateAction<string>> }> = ({ globalFilter, setGlobalFilter }) => {
    return (
         <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search books"
          className="mb-4 p-2 border rounded"
        />
    );
}


export default Search;