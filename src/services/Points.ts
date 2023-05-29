import axios from "axios";

export const handleIncreasePoint = async (userId: string, point: number) => {
  try {
    const resp = await axios.post(
      `https://app.muachung.co/api/user/increasePoint`,
      {
        userId: userId,
        point: point,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
