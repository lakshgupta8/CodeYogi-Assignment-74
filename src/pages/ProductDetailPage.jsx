import { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineArrowNarrowLeft,
} from "react-icons/hi";
import { useCart } from "../hooks/useCart";
import NotFound from "../components/NotFound";
import LoadingProduct from "../components/LoadingProduct";
import { getProduct } from "../api";

function ProductDetailPage() {
  const id = +useParams().id;
  const location = useLocation();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(
    function () {
      setCount(1);
      getProduct(id)
        .then(function (product) {
          setProduct(product);
          setLoading(false);
        })
        .catch(function () {
          setError(true);
          setLoading(false);
        });
    },
    [id]
  );

  let title, image, price, description, category;
  if (product) {
    title = product.title;
    const images = product.images || [];
    image = images[0];
    price = product.price;
    description = product.description;
    category = product.category;
  }

  const handleCountChange = useCallback(
    function (event) {
      setCount(Number(event.target.value));
    },
    [setCount]
  );

  const handleAddToCart = useCallback(
    function (event) {
      const button = event.currentTarget;
      button.textContent = "ADDING...";
      button.disabled = true;

      setTimeout(function () {
        button.textContent = "ADD TO CART";
        button.disabled = false;
      }, 300);

      addToCart(id, count);
      setCount(1);
    },
    [addToCart, id, count]
  );

  const handleProductSwitch = useCallback(
    function () {
      setLoading(true);
    },
    [setLoading]
  );

  return (
    <>
      {loading && <LoadingProduct />}
      {error && <NotFound />}
      {!loading && !error && (
        <div className="flex flex-col md:px-8 pb-8">
          <Link
            to={location?.state?.from === "cart" ? "/cart" : "/"}
            className="self-end"
          >
            <HiOutlineArrowNarrowLeft className="text-gray-800 text-3xl md:text-4xl" />
          </Link>

          <div className="flex md:flex-row flex-col gap-3 bg-white px-4 md:px-8 py-6">
            <div className="flex justify-center items-center bg-gray-100 w-full md:w-1/2 h-full">
              <img
                className="bg-gray-100 w-full h-full object-contain"
                src={image}
                alt={title}
              />
            </div>

            <div className="flex flex-col px-2 md:px-8 w-full md:w-1/2 overflow-auto">
              <div className="flex-1">
                <h1 className="mb-6 md:mb-10 font-semibold text-gray-500 text-3xl lg:text-5xl">
                  {title}
                </h1>
                <p className="mb-4 font-bold text-gray-600 text-xl lg:text-3xl">
                  ${price !== null ? price.toFixed(2) : "-"}
                </p>
                <p className="mb-6 md:mb-8 font-semibold text-gray-500 text-base lg:text-2xl">
                  {description}
                </p>

                <div className="flex sm:flex-row flex-col items-center gap-3">
                  <input
                    type="number"
                    value={count}
                    onChange={handleCountChange}
                    min={1}
                    className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-dark w-24 sm:w-16 text-gray-600"
                  />
                  <button
                    onClick={handleAddToCart}
                    className="bg-primary-default hover:bg-primary-dark px-8 sm:px-12 py-2 rounded-md w-full sm:w-auto font-medium text-white"
                  >
                    ADD TO CART
                  </button>
                </div>

                <p className="mt-6 text-gray-500 text-base">
                  Category:
                  <span className="text-primary-default"> {category}</span>
                </p>
              </div>

              <div className="flex justify-between mt-6 md:mt-10">
                <div>
                  {id > 1 && (
                    <Link
                      to={"/product/" + (id - 1)}
                      className="flex flex-col items-center"
                      onClick={handleProductSwitch}
                    >
                      <HiArrowSmLeft className="text-gray-800 text-3xl md:text-4xl" />
                      <p className="text-gray-800 text-sm md:text-xl">
                        Previous
                      </p>
                    </Link>
                  )}
                </div>

                <div>
                  {id < 194 && (
                    <Link
                      to={"/product/" + (id + 1)}
                      className="flex flex-col items-center"
                      onClick={handleProductSwitch}
                    >
                      <HiArrowSmRight className="text-gray-800 text-3xl md:text-4xl" />
                      <p className="text-gray-800 text-sm md:text-xl">Next</p>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
