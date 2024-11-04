import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '../ThemeContext';

export default function AddEntryScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission d'accès à la galerie requise.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveEntry = async () => {
    const newEntry = {
      id: uuidv4(),
      date: new Date().toLocaleDateString(),
      title,
      content,
      imageUri: image,
    };

    const savedEntries = await AsyncStorage.getItem('journalEntries');
    const entries = savedEntries ? JSON.parse(savedEntries) : [];
    entries.push(newEntry);

    await AsyncStorage.setItem('journalEntries', JSON.stringify(entries));
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <TextInput
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
      />
      <TextInput
        placeholder="Contenu"
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, styles.textArea, isDarkMode ? styles.darkInput : styles.lightInput]}
      />
      <TouchableOpacity style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]} onPress={pickImage}>
        <Text style={[styles.buttonText, isDarkMode ? styles.darkText : styles.lightText]}>Choisir une Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]} onPress={saveEntry}>
        <Text style={[styles.buttonText, isDarkMode ? styles.darkText : styles.lightText]}>Enregistrer l'Entrée</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#f9f9f9',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  lightButton: {
    backgroundColor: '#4CAF50',
  },
  darkButton: {
    backgroundColor: '#1E90FF',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  darkInput: {
    backgroundColor: '#555', // Couleur d'arrière-plan pour les champs de saisie en mode sombre
    borderColor: '#777',
    color: '#fff',
  },
  lightInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#000',
  },
});
