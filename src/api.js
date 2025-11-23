import axios from "axios";

export function getProductList() {
  return axios
    .get("https://dummyjson.com/products?limit=0")
    .then((response) => response.data.products);
}

export function getProduct(id) {
  return axios
    .get(`https://dummyjson.com/products/${id}`)
    .then((response) => response.data);
}

export function addUser(firstName, email, password) {
  const url = "https://r5ftltl6sj.execute-api.us-east-1.amazonaws.com/signup";
  const data = {
    firstName,
    email,
    password,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: () => true,
  };

  return axios
    .post(url, data, config)
    .then((response) => {
      if (response.status >= 400) {
        const errorMessage = response.data?.message || "An error occurred";
        throw new Error(errorMessage);
      }
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message || "An error occurred";
        throw new Error(errorMessage);
      }
      throw error;
    });
}
