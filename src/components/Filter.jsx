import { memo, useCallback } from "react";
import Input from "./Input";

function Filter({ query, sort, onSearch, onSort }) {
  const handleSearch = useCallback(
    function (event) {
      onSearch(event.target.value);
    },
    [onSearch]
  );

  const handleSort = useCallback(
    function (event) {
      onSort(event.target.value);
    },
    [onSort]
  );

  return (
    <div className="flex sm:flex-row flex-col sm:justify-between gap-3 text-gray-600 text-xs">
      <Input
        id="search"
        name="search"
        aria-label="Search products"
        value={query}
        type="text"
        placeholder="Search products"
        className="focus:ring-primary-light sm:w-64 placeholder-gray-600"
        onChange={handleSearch}
        autoComplete="search"
      />

      <select
        value={sort}
        className="p-3 border focus:border-transparent rounded focus:outline-none focus:ring-2 focus:ring-primary-light w-full sm:w-64"
        onChange={handleSort}
      >
        <option value="default">Default Sort</option>
        <option value="title">Sort by title</option>
        <option value="price-asc">Sort by price: low to high</option>
        <option value="price-desc">Sort by price: high to low</option>
      </select>
    </div>
  );
}

export default memo(Filter);
