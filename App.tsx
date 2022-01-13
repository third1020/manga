import React, { useRef, useState, useEffect, useContext } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import MainStackComponent from "./src/navigation/MainStack";
import useCachedResources from "./src/hooks/useCachedResources";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Button,
} from "react-native";
import { LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import { LoginProvider, LoginContext } from "./src/Context/LoginContext";
import { ThemeProvider, ThemeContext } from "./src/Context/ThemeContext";
import DarkLoginScreen from "react-native-dark-login-screen";
import img from "./assets/user.jpg";
import PDFReader from "rn-pdf-reader-js";
import { storeDataUser, getDataUser } from "./store_data";
import { loginAuth } from "./src/api/auth";

LogBox.ignoreAllLogs();
//
// function MangaApp() {
//   const isLoadingComplete = useCachedResources();
//   const [login, setlogin] = React.useContext(LoginContext);
//   const source = { uri: "https://bitcoin.org/bitcoin.pdf", cache: true };
//
//   if (!isLoadingComplete) {
//     return null;
//   } else {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "#ecf0f1",
//           width: Dimensions.get("window").width,
//           height: Dimensions.get("window").height,
//           padding: 0,
//         }}
//       >
//       <StatusBar/>
//         <PDFReader
//           style={{ flex: 1, padding: 0, margin: 0 }}
//           withPinchZoom={true}
//           webviewStyle={{ margin: -20, backgroundColor: "white" }}
//           customStyle={{
//             readerContainerNumbersContent: {
//               marginTop: 20,
//             },
//             readerContainer: {
//               margin: "auto",
//
//             },
//             readerContainerNavigate: {
//               marginBottom: 20,
//             },
//             readerContainerZoomContainer: {
//               borderRadius: 30,
//               backgroundColor: "black",
//             },
//             readerContainerZoomContainerButton: {
//               borderRadius: 30,
//               visibility:"hidden",
//               display: "none"
//             },
//           }}
//           source={{
//             uri:
//               "https://demo.tooncontent.com/uploads/562627e9b8f540be71dbc4f09761b3e2.pdf",
//           }}
//         />
//       </View>
//     );
//   }
// }
const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

function MangaApp() {
  const isLoadingComplete = useCachedResources();
  const [login, setlogin] = React.useContext(LoginContext);
  const [theme, settheme] = React.useContext(ThemeContext);
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [authstatusfailed, setauthstatusfailed] = React.useState(false);

  useEffect(async () => {
    const user = await getDataUser();
    if (user.token) {
      console.log(user);
      setlogin(true);
    }
  }, []);
  if (!isLoadingComplete) {
    return null;
  } else {
    if (login) {
      return (
        <NavigationContainer
          theme={theme === "dark" ? DarkTheme : DefaultTheme}
        >
          <NativeBaseProvider>
            <MainStackComponent />
          </NativeBaseProvider>
        </NavigationContainer>
      );
    } else {
      return (
        <LoginProvider>
          <DarkLoginScreen
            titleText={"Manga"}
            descriptionText={
              authstatusfailed
                ? "Username or password invalid"
                : "Please sign in to your account"
            }
            descriptionTextStyle={
              authstatusfailed
                ? { color: authstatusfailed ? "red" : "white" }
                : null
            }
            usernamePlaceholder={"Email"}
            titleTextStyle={styles.container}
            handleSignInButton={() => console.log("sign in")}
            handleSignUpButton={() => console.log("sign up")}
            fullNameOnChange={(value: string) =>
              console.log("full name", value)
            }
            enableGoogleLogin={false}
            enableFacebookLogin={false}
            enableAppleLogin={false}
            usernameChangeText={(text) => setusername(text)}
            passwordChangeText={(text) => setpassword(text)}
            handleSignInButton={() => {
              console.log(username);
              console.log(password);
              loginAuth(username, password)
                .then((resultLogin) => {
                  console.log(resultLogin);
                  if (resultLogin) {
                    setlogin(true);
                    setauthstatusfailed(false);
                  } else {
                    setauthstatusfailed(true);
                  }
                })
                .catch((error) => {
                  setauthstatusfailed(true);
                });
              // "pdbw58107@gmail.com",
              // "pao123456"

              // storeDataUser({ user_name: "third", token: "dfhokijnfdopihm" })
            }}
          />
        </LoginProvider>
      );
    }
  }
}

function App() {
  return (
    <LoginProvider>
      <ThemeProvider>
        <MangaApp />
      </ThemeProvider>
    </LoginProvider>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
  },
  pdf: {
    flex: 1,

    width: "110%",
  },
});
//
// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: "30%",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
//   linkText: {
//     fontSize: 14,
//     color: "#2e78b7",
//   },
// });
//
// <Button title="test" onPress={() => getDataUser()} />
