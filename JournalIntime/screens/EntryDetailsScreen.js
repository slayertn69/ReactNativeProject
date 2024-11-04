import React from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EntryDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { entry } = route.params; // Récupérer l'entrée passée

  const deleteEntry = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('journalEntries');
      const entries = savedEntries ? JSON.parse(savedEntries) : [];
      console.log("Entries before delete:", entries);
      console.log("Deleting entry with id:", entry.id);

      const updatedEntries = entries.filter((e) => e.id !== entry.id);
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

      
      const newEntries = await AsyncStorage.getItem('journalEntries');
      console.log("Entries after delete:", newEntries ? JSON.parse(newEntries) : []);
      
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erreur lors de la suppression de l’entrée:', error);
    }
  };

  const confirmDelete = () => {
    Alert.alert('Supprimer', 'Voulez-vous supprimer cette entrée ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', onPress: deleteEntry },
    ]);
  };

  return (
    <View>
      <Text>{entry.date}</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{entry.title}</Text>
      <Text>{entry.content}</Text>
      {entry.imageUri && <Image source={{ uri: entry.imageUri }} style={{ width: 300, height: 300, marginVertical: 20 }} />}
      <Button title="Supprimer l'Entrée" onPress={deleteEntry} />
    </View>
  );
}
