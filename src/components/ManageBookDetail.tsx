import React, { useRef, useEffect, useState } from "react";
import { View, Button, FlatList, Pressable } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import ListItem from "./ListItem";
import Icon from "./Icon";
import ListItemSeparator from "./ListItemSeparator";
import BookCard from "./BookCard";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { useTheme } from "@react-navigation/native";
export default function ManageBookDetail({ book }) {
  const [checkDownLoaded, setcheckDownLoaded] = useState(false);
  const { colors } = useTheme();
  const [menuItems, setmenuItems] = useState([
    {
      title: "Download",
      icon: {
        name: "cloud-download-outline",
        backgroundColor: "black",
      },
      onPress: () => downloadFile(book.fullFile),
    },
  ]);
  const refRBSheet = useRef();
  const navigation = useNavigation();

  const downloadFile = (uri) => {
    let lastIndex = uri.lastIndexOf("/");

    let fileName = uri.substring(lastIndex);
    let fileUri = FileSystem.documentDirectory + fileName;
    console.log(FileSystem.documentDirectory);
    FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        getFileUri(fileName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteFile = (fileUri) => {
    FileSystem.deleteAsync(fileUri).then((res) => {
      setmenuItems([
        {
          title: "Download",
          icon: {
            name: "cloud-download-outline",
            backgroundColor: "black",
          },
          onPress: () => downloadFile(book.fullFile),
        },
      ]);
    });
    setcheckDownLoaded(false);
  };

  function getFileUri(name) {
    let lastIndex = name.lastIndexOf("/");

    let fileName = name.substring(lastIndex);
    FileSystem.getInfoAsync(FileSystem.documentDirectory + fileName).then(
      (res) => {
        if (res.size) {
          const stringSize = res.size / 1000000;
          setmenuItems([
            {
              title: stringSize.toFixed(2) + "MB",
              icon: {
                name: "file",
                backgroundColor: "black",
              },
              onPress: () => downloadFile(book.fullFile),
            },
            {
              title: "Delete",
              icon: {
                name: "delete",
                backgroundColor: "black",
              },
              onPress: () => deleteFile(res.uri),
            },
          ]);
          setcheckDownLoaded(true);
        }
      }
    );
  }

  const _onPress = () => {
    downloadFile();
  };

  useEffect(() => {
    getFileUri(book.fullFile);
  }, [book]);

  return (
    <>
      <View>
        <Ionicons
          onPress={() => refRBSheet.current.open()}
          size={20}
          style={{ marginBottom: -3 }}
          color={colors.text}
          name="ellipsis-horizontal"
        />

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <View>
            <View style={{ marginLeft: 20 }}>
              <BookCard book={book} width={60} height={90} />
            </View>
            <ListItemSeparator />
            <FlatList
              data={menuItems}
              keyExtractor={(menuItem) => menuItem.title}
              ItemSeparatorComponent={ListItemSeparator}
              renderItem={({ item }) => (
                <>
                  <ListItem
                    onPress={item.onPress}
                    title={item.title}
                    IconComponent={
                      <Icon
                        name={item.icon.name}
                        backgroundColor={item.icon.backgroundColor}
                      />
                    }
                  />
                </>
              )}
            />
          </View>
        </RBSheet>
      </View>
      <View>
        <Ionicons
          onPress={() => downloadFile(book.fullFile)}
          size={20}
          style={{ marginBottom: -3 }}
          color={colors.text}
          name={checkDownLoaded ? "checkmark-outline" : "cloud-outline"}
        />
      </View>
    </>
  );
}
