import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Product, SortOption } from "../types";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  // Read filters from URL
  const getFiltersFromURL = () => {
    const params = new URLSearchParams(location.search);
    const cats = params.getAll("category");
    const sort = (params.get("sort") || "") as SortOption;
    return { selectedCategories: cats, sort };
  };

  const { selectedCategories, sort } = getFiltersFromURL();

  // Fetch categories on mount
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data: string[]) => setCategories(data))
      .catch(() => setError("Failed to fetch categories"));
  }, []);

  // Fetch products when URL changes
  useEffect(() => {
    fetchProducts();
  }, [location.search]);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      let data: Product[] = [];

      if (selectedCategories.length === 0) {
        // fetch all products
        const res = await fetch("https://fakestoreapi.com/products");
        data = await res.json();
      } else {
        // fetch each category in parallel
        const requests = selectedCategories.map((cat) =>
          fetch(`https://fakestoreapi.com/products/category/${cat}`).then(
            (res) => res.json(),
          ),
        );
        const results = await Promise.all(requests);
        // merge all results
        data = results.flat();
      }

      // Apply sorting
      if (sort === "price-asc") {
        data.sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        data.sort((a, b) => b.price - a.price);
      } else if (sort === "rating") {
        data.sort((a, b) => b.rating.rate - a.rating.rate);
      }

      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Update URL when filter/sort changes
  const updateURL = (newCategories: string[], newSort: SortOption) => {
    const params = new URLSearchParams();
    newCategories.forEach((cat) => params.append("category", cat));
    if (newSort) params.set("sort", newSort);
    navigate(`?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    updateURL(updated, sort);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateURL(selectedCategories, e.target.value as SortOption);
  };

  const clearFilters = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">All Products</h1>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                data-cy="category-filter"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${
                  selectedCategories.includes(cat)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={handleSortChange}
            className="ml-auto border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {/* Clear filters */}
          {(selectedCategories.length > 0 || sort) && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && <div className="text-center text-red-500 mt-10">{error}</div>}

        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No products found
          </div>
        )}

        {!loading && !error && (
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
