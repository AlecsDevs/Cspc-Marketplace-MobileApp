import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  // Function to open image picker and select an image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);  // Set the selected image URI
    }
  };

  // Function to handle post creation and saving to AsyncStorage
  const handleAddPost = async () => {
    if (!title || !description || !price || !image) {
      Alert.alert('Error', 'Please fill in all fields and select an image.');
      return;
    }

    try {
      // Get existing posts from AsyncStorage or initialize an empty array
      const existingPosts = JSON.parse(await AsyncStorage.getItem('posts')) || [];

      // Create a new post
      const newPost = { title, description, price, image };

      // Save the new post in AsyncStorage
      existingPosts.push(newPost);
      await AsyncStorage.setItem('posts', JSON.stringify(existingPosts));

      // Clear form after submission
      clearForm();

      // Navigate to Explore Screen
      navigation.navigate('Explore');
    } catch (error) {
      Alert.alert('Error', 'There was a problem saving the post. Please try again.');
    }
  };

  // Function to clear the form
  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Listing</Text>
      
      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddPost}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Clear Button */}
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearForm}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#002a7a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 150,
    marginVertical: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#002a7a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#d9534f', // Red color for clear button
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPostScreen;
