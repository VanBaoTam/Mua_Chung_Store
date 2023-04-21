import axios from "axios";
export const getProvinces = async () => {
  try {
    const resp = await axios.get(`https://provinces.open-api.vn/api/p/`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDistricts = async (province_id: number) => {
  try {
    const resp = await axios.get(
      `https://provinces.open-api.vn/api/p/${province_id}?depth=2`
    );
    return resp.data.districts;
  } catch (error) {
    console.log(error);
  }
};

export const getWards = async (district_id: number) => {
  try {
    const resp = await axios.get(
      `https://provinces.open-api.vn/api/d/${district_id}?depth=2`
    );
    return resp.data.wards;
  } catch (error) {
    console.log(error);
  }
};
