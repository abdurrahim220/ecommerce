import axios from "axios";

export const baseUrl = "http://localhost:5000/api";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(baseUrl + url);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
