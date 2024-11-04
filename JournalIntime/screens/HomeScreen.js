import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
 
export default function HomeScreen({ navigation }) {
  const [entries, setEntries] = useState([]);
 
  const loadEntries = async () => {
    const savedEntries = await AsyncStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  };
 
  useFocusEffect(
    React.useCallback(() => {
      loadEntries();
    }, [])
  );
 
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEntry')}>
        <Text style={styles.addButtonText}>Ajouter une Nouvelle Entrée</Text>
      </TouchableOpacity>
     
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.entryContainer}
            onPress={() => navigation.navigate('EntryDetails', { entry: item })}
          >
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryTitle}>{item.title}</Text>
            <Text style={styles.entryContent}>{item.content.slice(0, 30)}...</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  entryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  entryDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  entryContent: {
    fontSize: 16,
    color: '#555',
  },
});
 
 