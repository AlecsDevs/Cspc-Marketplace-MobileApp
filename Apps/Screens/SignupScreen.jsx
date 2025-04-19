import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';

export default function LoginScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setemail] = useState('');

  const handleSigin = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    console.log("initialized db");
    try {
      const db = await SQLite.openDatabaseAsync('Project_123');

      await db.execAsync( 
        `CREATE TABLE IF NOT EXISTS users (
       
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );`);
    } catch (e) {
      console.error("Error creating table:", e);
    }

    try {
      const db = await SQLite.openDatabaseAsync('Project_123');

      await db.runAsync('INSERT INTO users (email , password) VALUES (?, ?)', email, password);
      console.log(email,password)
      navigation.navigate("Login");

    } catch (e) {
      console.error("Error inserting data:", e);
    }
  };

  return (
    <ImageBackground
      source={require("./../../assets/bg_form.png")}
      style={styles.background}
    >
      <View style={styles.cover} />
      <Image
        source={require("./../../assets/Cspc_Logo.png")}
        style={styles.logo}
      />
      <View style={styles.box}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setemail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Confirm Password"
            secureTextEntry={!passwordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#0056b3" : "#002a7a" },
          ]}
          onPress={handleSigin} // Fixed
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Text style={styles.text1}>
          Have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 270,
    height: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  cover: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  inputPassword: {
    flex: 1,
    height: 40,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    fontSize: 13,
    textDecorationLine: "underline",
  },
  text1: {
    marginTop: 20,
    fontSize: 12,
    textAlign: "center",
  },
});