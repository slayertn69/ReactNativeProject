import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EntryDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { entry } = route.params;

  const deleteEntry = async () => {
    const savedEntries = await AsyncStorage.getItem('journalEntries');
    const entries = savedEntries ? JSON.parse(savedEntries) : [];
    const updatedEntries = entries.filter((e) => e.id !== entry.id);

    await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    navigation.navigate('Home');
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
      <Button title="Supprimer l'Entrée" onPress={confirmDelete} />
    </View>
  );
}
