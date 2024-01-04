import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewUser = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.22.131:3003/api/v1/administration/getUserList")
      .then((res) => setItems(res.data._value))
      .catch((error) => console.error("Error fetching items", error));
    // console.log(items)
  }, []);

  console.log(items);

  return (
    <div>
      <p>Testing Page</p>
    </div>
  );
};

export default ViewUser;
