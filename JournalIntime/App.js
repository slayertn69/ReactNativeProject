import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import EntryDetailsScreen from './screens/EntryDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Journal Intime' }} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} options={{ title: 'Nouvelle Entrée' }} />
        <Stack.Screen name="EntryDetails" component={EntryDetailsScreen} options={{ title: 'Détails de l’Entrée' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

