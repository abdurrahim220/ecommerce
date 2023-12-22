import axios from "axios";

export const baseUrl = "https://rahimstore.onrender.com/api";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(baseUrl + url);
    return data;
  } catch (err) {
    // console.log(err);
    return err;
  }
};
