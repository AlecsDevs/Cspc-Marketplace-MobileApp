import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Import bottom tab navigator
import LoginScreen from "./Apps/Screens/LoginScreen";
import SignupScreen from "./Apps/Screens/SignupScreen";
import HomeScreen from "./Apps/Screens/HomeScreen";
import ExploreScreen from "./Apps/Screens/ExploreScreen";
import AddPostScreen from "./Apps/Screens/AddPostScreen";
import ProfileScreen from "./Apps/Screens/ProfileScreen";
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from "./Apps/Components/HeaderComponent";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); 


function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Explore') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'AddPost') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#002a7a',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Home" 
      options={{ headerShown: false }} 
      component={HomeScreen} 
      />
      <Tab.Screen name="Explore" 
      options={{ headerShown: false }} 
      component={ExploreScreen} 
      />
       <Tab.Screen name="AddPost" 
      options={{ headerShown: false }} 
      component={AddPostScreen} 
      />
    <Tab.Screen name="Profile" 
      options={{ headerShown: false }} 
      component={ProfileScreen} 
      />
      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home" 
          component={TabNavigator} 
          options={{
            headerTitle: () => <HeaderComponent/>,
            headerStyle: {
              backgroundColor: "white", 
            },
            headerTintColor: "#000", 
            headerTitleStyle: {
              fontWeight: "bold", 
            },
          }}
          
        />
       

      </Stack.Navigator>
    </NavigationContainer>
  );
}
