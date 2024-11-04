import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
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
    navigation.navigate('Home');
  };

  return (
    <View>
      <TextInput
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Contenu"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, height: 150 }}
      />
      <Button title="Enregistrer l'Entrée" onPress={saveEntry} />
    </View>
  );
}
