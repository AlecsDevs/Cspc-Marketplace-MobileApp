import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";

const ProfileScreen = ({ navigation ,}) => {

  const handleLogout = () => {
   

    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: () => {
          // Reset the navigation stack and navigate to the login screen
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }], // Replace 'Login' with your login screen route name
            })
          );
        },
      },
    ]);
  };

  const handleexplore = () =>{
    navigation.navigate('Explore');

  }
  
  const handlehome = () =>{
    navigation.navigate('Home');

  }
  const handleaddpost = () =>{
    navigation.navigate('AddPost');

  }
    return (
    <View style={styles.container}>
      <View style={styles.profileImage}></View>
     

     

      <TouchableOpacity style={styles.button} onPress={handlehome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleexplore}>
        <Text style={styles.buttonText}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleaddpost}>
        <Text style={styles.buttonText}>Add Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    marginTop: -20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: 300,
    height: 50,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#002a7a",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  logoutButton: {
    marginTop: 200,
    width: 300,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#f3f3f3",
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888",
  },
});

export default ProfileScreen;
