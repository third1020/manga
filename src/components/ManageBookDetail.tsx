import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const ManageBookDetail = () => {
  // renders
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ManageBookDetail;
