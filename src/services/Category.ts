import axios from "axios";

export const getCategories = async (access_token: string) => {
  try {
    const response = await axios.get(
      "https://openapi.zalo.me/v2.0/mstore/cate/getcateofoa",
      {
        headers: {
          "Content-Type": "application/json",
          access_token: access_token,
        },
      }
    );
    console.log(response);
    //     return response.data.data.products;
  } catch (error) {
    console.log(error);
  }
};
