import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api';

const useProducts = (endPoint) => {
    const [data2, setData] = useState();

    // console.log(data2)

    useEffect(() => {
      makeApiCall();
    }, []);
  
    const makeApiCall = async () => {
      const res = await fetchDataFromApi(endPoint);
      setData(res);
    };
  
    return [data2];
  };


export default useProducts