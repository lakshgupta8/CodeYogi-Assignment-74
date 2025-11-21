import React, { useState, useEffect, useMemo, useCallback } from "react";
import Filter from "../components/Filter.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import NoMatch from "../components/NoMatch.jsx";
import Loading from "../components/Loading.jsx";
import { getProductList } from "../api.js";

function HomePage() {
  const [productList, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    getProductList().then(function (products) {
      setProducts(products);
      setLoading(false);
    });
  }, []);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(
    function () {
      let filtered = productList.filter(function (item) {
        return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });

      if (sort === "title") {
        filtered = filtered.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
      } else if (sort === "price-asc") {
        filtered = filtered.sort(function (a, b) {
          return a.price - b.price;
        });
      } else if (sort === "price-desc") {
        filtered = filtered.sort(function (a, b) {
          return b.price - a.price;
        });
      }
      return filtered;
    },
    [productList, query, sort]
  );

  const handleSearch = useCallback(
    function (newQuery) {
      setQuery(newQuery);
    },
    [setQuery]
  );

  const handleSort = useCallback(
    function (sortType) {
      setSort(sortType);
    },
    [setSort]
  );

  const handleClearSearch = useCallback(
    function () {
      setQuery("");
    },
    [setQuery]
  );

  return (
    <div className="bg-white mx-auto my-8 md:my-16 px-9 py-8 max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
      <div className="flex flex-col gap-4">
        <p className="text-gray-400 text-xs">Home / Shop</p>
        <h1 className="mb-4 text-primary-light text-4xl">Shop</h1>
        <Filter
          query={query}
          sort={sort}
          onSearch={handleSearch}
          onSort={handleSort}
        />
      </div>
      {loading && <Loading />}
      {!loading && filteredProducts.length > 0 && (
        <>
          <ProductGrid products={filteredProducts} />
          <Pagination />
        </>
      )}
      {!loading && filteredProducts.length === 0 && (
        <NoMatch searchQuery={query} onClearSearch={handleClearSearch} />
      )}
    </div>
  );
}

export default HomePage;
