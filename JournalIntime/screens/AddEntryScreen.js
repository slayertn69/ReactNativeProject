import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';

export default function AddEntryScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  const saveEntry = async () => {
    const newEntry = {
      id: uuidv4(),
      date: new Date().toLocaleDateString(),
      title,
      content,
    };

    const savedEntries = await AsyncStorage.getItem('journalEntries');
    const entries = savedEntries ? JSON.parse(savedEntries) : [];
    entries.push(newEntry);

    await AsyncStorage.setItem('journalEntries', JSON.stringify(entries));

    navigation.navigate('Home', { refresh: true });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
        style={styles.inputTitle}
      />
      <TextInput
        placeholder="Contenu"
        value={content}
        onChangeText={setContent}
        multiline
        style={styles.inputContent}
      />
      <Button
        title="Enregistrer l'Entrée"
        onPress={saveEntry}
        color="#6200ea" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,               
    backgroundColor: '#f5f5f5', 
  },
  inputTitle: {
    borderColor: 'gray',       
    borderWidth: 1,             
    padding: 10,                
    marginBottom: 15,           
    borderRadius: 10,           
    backgroundColor: '#fff',    
    fontSize: 18,               
  },
  inputContent: {
    borderColor: 'gray',        
    borderWidth: 1,             
    padding: 10,                
    height: 150,                
    borderRadius: 10,           
    backgroundColor: '#fff',    
    fontSize: 16,               
    marginBottom: 20,           
    textAlignVertical: 'top',   
  },
});
