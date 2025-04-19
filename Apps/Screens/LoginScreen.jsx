import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { CommonActions } from '@react-navigation/native';
import React, { useState,} from "react";


export default function LoginScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const handleLogin = async () => {
    const db = await SQLite.openDatabaseAsync('Project_123');

    try {
      const allRows = await db.getAllAsync('SELECT * FROM users WHERE email = ?' ,email);
      for (const row of allRows) {
        if(row.email  == email){
      
          if (row.password == password)
          {
           Alert.alert('Succesful Login' + 'Welcome' ,row.email)
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],

              })
             
            );
            
          }
        }
      }
     
  }catch(error){

  }
}

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
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#0056b3" : "#002a7a" },
          ]}
          onPress={handleLogin} // Login functionality
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>


        <Text style={styles.text1}>
          Don’t have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign Up
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
    paddingHorizontal: 60,
    alignItems: "center",
    color: "#007bff",
    marginVertical: 12,
    fontSize: 13,
    textDecorationLine: "underline",
  },
  text1: {
    marginVertical: 50,
    fontSize: 12,
    paddingHorizontal: 23,
  },
});