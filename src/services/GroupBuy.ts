import axios from "axios";

export const popularGroupBuyId = async () => {
  try {
    const resp = await axios.get("https://app.muachung.co/api/groupbuy/top10");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
