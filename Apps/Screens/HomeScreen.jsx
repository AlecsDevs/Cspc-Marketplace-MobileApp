import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <Image
        source={require("./../../assets/Home_pages.png")}
        style={styles.cover}
      />

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    margin: 15,
  },
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10, 
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#002a7a",
    borderRadius: 5,
  },
  offersContainer: {
    marginTop: 20,
  },
  offersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  offersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  offerButton: {
    flex: 1,
    padding: 5,
    backgroundColor: "#002a7a",
    borderRadius: 5,
    marginHorizontal: 5, 
    alignItems: "center",
  },
  offerText: {
    color: "white",
    fontWeight: 'bold',
  },
});
