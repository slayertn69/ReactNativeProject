import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const [entries, setEntries] = useState([]);
  const [selectedImportance, setSelectedImportance] = useState('tout');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#333' : '#4CAF50',
      },
      headerTintColor: isDarkMode ? '#fff' : '#000',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={24} color={isDarkMode ? '#fff' : '#000'} style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isDarkMode]);

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

  const filteredEntries = entries.filter(entry => {
    if (selectedImportance === 'tout') return true;
    return entry.importance === selectedImportance;
  });

  const renderEntry = ({ item }) => (
    <TouchableOpacity
      style={[styles.entryContainer, isDarkMode ? styles.darkEntryContainer : styles.lightEntryContainer]}
      onPress={() => navigation.navigate('EntryDetails', { entry: item })}
    >
      <Text style={[styles.entryDate, isDarkMode ? styles.darkText : styles.lightText]}>{item.date}</Text>
      <Text style={[styles.entryTitle, isDarkMode ? styles.darkText : styles.lightText]}>{item.title}</Text>
      <Text style={[styles.entryContent, isDarkMode ? styles.darkText : styles.lightText]}>
        {item.content.slice(0, 30)}...
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <TouchableOpacity
        style={[styles.addButton, isDarkMode ? styles.darkButton : styles.lightButton]}
        onPress={() => navigation.navigate('AddEntry')}
      >
        <Text style={[styles.addButtonText, isDarkMode ? styles.darkText : styles.lightText]}>
          Ajouter une Nouvelle Entrée
        </Text>
      </TouchableOpacity>

      <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Filtrer par Importance :</Text>
      <Picker
        selectedValue={selectedImportance}
        style={[styles.picker, isDarkMode ? styles.darkPicker : styles.lightPicker]}
        onValueChange={(itemValue) => setSelectedImportance(itemValue)}
      >
        <Picker.Item label="Tout" value="tout" />
        <Picker.Item label="Important" value="important" />
        <Picker.Item label="Moins Important" value="moins important" />
      </Picker>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id}
        renderItem={renderEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#f9f9f9',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  addButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  lightButton: {
    backgroundColor: '#4CAF50',
  },
  darkButton: {
    backgroundColor: '#1E90FF',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  entryContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lightEntryContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  darkEntryContainer: {
    backgroundColor: '#444',
    borderColor: '#666',
  },
  entryDate: {
    fontSize: 14,
    marginBottom: 5,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  entryContent: {
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  lightPicker: {
    backgroundColor: '#fff',
  },
  darkPicker: {
    backgroundColor: '#444',
    color: '#fff',
  },
});
