import React, { useEffect, useState } from "react";
import productApi from "./util/productApi";

const Home = () => {
  const [data, setData] = useState(null);
  const apicall = async () => {
    const datas = await productApi();
    setData(datas);
    console.log("data", data);
  };
  console.log("data", data);
  useEffect(() => {
    apicall();
  }, []);

  return <div>ddd</div>;
};

export default Home;
