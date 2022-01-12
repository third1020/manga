import axios from "axios";
import { storeDataUser } from "../../store_data";
const getHeaders = async () => {
  // const token = await getStorageToken();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // if (token !== "undefined" && token.length > 0) {
  //   headers["auth"] = `${token}`;
  // }

  return headers;
};

export const loginAuth = async (email, password) => {
  const body = { email: email, password: password };
  const headers = await getHeaders();

  const result = await axios.post(
    "https://api.tooncontent.com/login",
    body,
    headers
  );

  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  // console.log(body);
  // console.log(result);
  // console.log(JSON.stringify(body));

  if (result.status == 200) {
    await storeDataUser(result.data.message);
    return true;
    // return result;
  }
  return false;
  // throw { error: result };
};
