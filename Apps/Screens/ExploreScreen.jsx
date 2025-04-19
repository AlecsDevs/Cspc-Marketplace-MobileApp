import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const ExploreScreen = () => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused(); // Tracks if the screen is currently focused

  // Fetch posts from AsyncStorage
  const fetchPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('posts');
      console.log('Stored posts:', storedPosts); // Debug: log raw data from AsyncStorage

      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        if (Array.isArray(parsedPosts)) {
          console.log('Parsed posts:', parsedPosts); // Debug: log parsed data
          setPosts(parsedPosts);
        } else {
          console.warn('Posts data is not an array.');
          setPosts([]); // Reset to empty if invalid
        }
      } else {
        console.log('No posts found in AsyncStorage.');
        setPosts([]); // Reset to empty array
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // Fallback to an empty array on error
    }
  };

  // Fetch posts whenever the screen is focused
  useEffect(() => {
    if (isFocused) {
      fetchPosts();
    }
  }, [isFocused]);

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image
        source={{
          uri: item.image || 'https://via.placeholder.com/150',
        }}
        style={styles.postImage}
        onError={() => console.error('Image failed to load for:', item.image)}
      />
      <Text style={styles.postTitle}>{item.title || 'No Title'}</Text>
      <Text style={styles.postPrice}>₱ {item.price || '0.00'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Marketplace</Text>

      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noPostsText}>
          No posts available. Add new posts to explore the marketplace.
        </Text>
      )}
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
  listContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    width: '45%',
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  postPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#002a7a',
  },
  noPostsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ExploreScreen;
