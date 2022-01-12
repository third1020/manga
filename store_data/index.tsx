import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataUser = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_user", jsonValue);
    // alert(jsonValue);
  } catch (e) {
    // saving error
    alert(e);
  }
};

export const getDataUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_user");

    console.log(jsonValue);
    // alert(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    alert(e);
    console.log(e);
  }
};

export const removeDataUser = async () => {
  try {
    const jsonValue = await AsyncStorage.removeItem("@storage_user");

    console.log(jsonValue);
    // alert(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    alert(e);
    console.log(e);
  }
};

//
// export const storeData = async (value) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem("@storage_Key", jsonValue);
//     alert(jsonValue);
//   } catch (e) {
//     // saving error
//     alert(e);
//   }
// };
//
// export const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem("@storage_Key");
//
//     console.log(jsonValue);
//     alert(jsonValue);
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//     alert(e);
//     console.log(e);
//   }
// };
