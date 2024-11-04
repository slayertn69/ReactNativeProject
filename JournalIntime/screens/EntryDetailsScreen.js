import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext';

export default function EntryDetailsScreen() {
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { entry } = route.params;

  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadEntries = async () => {
    const savedEntries = await AsyncStorage.getItem('journalEntries');
    const entries = savedEntries ? JSON.parse(savedEntries) : [];
    setEntries(entries);
    console.log("Loaded entries:", entries);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const deleteEntry = async () => {
    try {
      const updatedEntries = entries.filter((e) => e.id !== entry.id);
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erreur lors de la suppression de l’entrée:', error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.date, isDarkMode ? styles.darkText : styles.lightText]}>{entry.date}</Text>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>{entry.title}</Text>
      <Text style={[styles.content, isDarkMode ? styles.darkText : styles.lightText]}>{entry.content}</Text>
      {entry.imageUri && <Image source={{ uri: entry.imageUri }} style={styles.image} />}

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.deleteButton}>
        <Text style={[styles.buttonText, isDarkMode ? styles.darkText : styles.lightText]}>Supprimer l'Entrée</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Supprimer l'Entrée</Text>
            <Text>Voulez-vous vraiment supprimer cette entrée ?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={[styles.buttonText, isDarkMode ? styles.darkText : styles.lightText]}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteEntry} style={styles.deleteButton}>
                <Text style={[styles.buttonText, isDarkMode ? styles.darkText : styles.lightText]}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#f4f4f4',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});
