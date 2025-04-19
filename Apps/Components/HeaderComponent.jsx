// HeaderComponent.js
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const HeaderComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("./../../assets/Cspc_Logo.png")}
        style={styles.logo}
      />
      <View style={styles.brandContainer}>
        <Text style={styles.lowerText}>Cspc</Text>
        <Text style={styles.brandName}>Marketplace</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  brandContainer: {
    flexDirection: "column",
  },
  brandName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lowerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
  },
});

export default HeaderComponent;
