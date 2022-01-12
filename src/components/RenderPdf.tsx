import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors, FontsList } from "../theme/styles";
import * as FileSystem from "expo-file-system";
const RenderPdf = ({ pdf }: string) => {
  const [source, setsource] = useState({
    uri: "",
  });
  const [view, setView] = useState("vertical");
  const navigation = useNavigation();

  function getFileUri(name) {
    let lastIndex = name.lastIndexOf("/");

    let fileName = name.substring(lastIndex);
    FileSystem.getInfoAsync(FileSystem.documentDirectory + fileName).then(
      (res) => {
        if (res.size) {
          setsource({ uri: res.uri }); //local file
        } else {
          setsource({ uri: pdf }); //https
        }
      }
    );
  }

  useEffect(() => {
    getFileUri(pdf);
  }, [pdf]);
  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="close" color="white" size={33} />
        </TouchableOpacity>
      </View>
      {source.uri != "" && view === "vertical" && (
        <PDFReader
          style={{ flex: 1, padding: 0, margin: 0 }}
          withScroll={true}
          withPinchZoom={true}
          webviewStyle={{
            margin: -20,
            backgroundColor: "white",
          }}
          customStyle={{
            readerContainerNumbersContent: {
              marginTop: 20,
            },
            readerContainer: {
              margin: "auto",
            },
            readerContainerNavigate: {
              marginBottom: 20,
            },
            readerContainerZoomContainer: {
              borderRadius: 30,
              backgroundColor: "black",
              display: "none",
            },
            readerContainerZoomContainerButton: {
              borderRadius: 30,
            },
          }}
          source={source}
        />
      )}
    </View>
  );
};

export default RenderPdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,

    // paddingBottom: 30,
  },

  rowHeader: {
    margin: 25,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgContainer: {
    alignItems: "center",
  },
});
