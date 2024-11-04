import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EntryDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { entry } = route.params;

  const deleteEntry = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('journalEntries');
      const entries = savedEntries ? JSON.parse(savedEntries) : [];

      const updatedEntries = entries.filter((e) => e.id !== entry.id);

      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

      navigation.navigate('Home', { refresh: true });
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la suppression.');
    }
  };

  const confirmDelete = () => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette entrée ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', onPress: deleteEntry },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{entry.date}</Text>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.content}>{entry.content}</Text>
      <Button
        title="Supprimer l'Entrée"
        onPress={deleteEntry}
        color="#d32f2f"
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
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 24,
  },
});
