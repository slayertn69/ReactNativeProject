import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
 
export default function EntryDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { entry } = route.params; // Récupérer l'entrée passée
 
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // État pour contrôler la visibilité du modal
 
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
      setEntries(updatedEntries); // Mettre à jour l'état local
      navigation.navigate('Home'); // Retourner à la page d'accueil
    } catch (error) {
      console.error('Erreur lors de la suppression de l’entrée:', error);
    }
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{entry.date}</Text>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.content}>{entry.content}</Text>
      {entry.imageUri && <Image source={{ uri: entry.imageUri }} style={styles.image} />}
 
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Supprimer l'Entrée</Text>
      </TouchableOpacity>
 
      {/* Modal de Confirmation */}
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
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteEntry} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Supprimer</Text>
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
    backgroundColor: '#f4f4f4',
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
    marginVertical: 20,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
 
 