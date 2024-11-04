import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
 
export default function AddEntryScreen() {
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
    <View style={styles.container}>
      <TextInput
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Contenu"
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, styles.textArea]}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choisir une Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={saveEntry}>
        <Text style={styles.buttonText}>Enregistrer l'Entrée</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
});
 
 