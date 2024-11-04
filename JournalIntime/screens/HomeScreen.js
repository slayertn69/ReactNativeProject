import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const savedEntries = await AsyncStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchEntries);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button
        title="Ajouter une Nouvelle Entrée"
        onPress={() => navigation.navigate('AddEntry')}
        color="#6200ea"
      />
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
            <Text style={styles.entryContent}>{item.content.slice(0, 3) + '...'}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  entryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  entryDate: {
    fontSize: 14,
    color: '#888',
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  entryContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
