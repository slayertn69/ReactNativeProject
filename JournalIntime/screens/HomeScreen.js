import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const savedEntries = await AsyncStorage.getItem('journalEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    };
    fetchEntries();
  }, []);

  return (
    <View>
      <Button title="Ajouter une Nouvelle Entrée" onPress={() => navigation.navigate('AddEntry')} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EntryDetails', { entry: item })}>
            <Text>{item.date}</Text>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
