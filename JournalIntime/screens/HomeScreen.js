import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
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
    <View>
      <Button title="Ajouter une Nouvelle Entrée" onPress={() => navigation.navigate('AddEntry')} />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EntryDetails', { entry: item })}>
            <Text style={{ fontWeight: 'bold' }}>{item.date}</Text>
            <Text>{item.title}</Text>
            <Text>{item.content.slice(0, 30)}...</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
