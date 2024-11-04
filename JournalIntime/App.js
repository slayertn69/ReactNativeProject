import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddEntryScreen from './screens/AddEntryScreen';
import EntryDetailsScreen from './screens/EntryDetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ThemeProvider } from './ThemeContext'; // Assurez-vous d'importer le contexte

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              title: 'Journal.io',
              headerStyle: {
                backgroundColor: '#4CAF50', 
              },
              headerTintColor: '#fff', 
            }} 
          />
          <Stack.Screen 
            name="AddEntry" 
            component={AddEntryScreen} 
            options={{ title: 'Nouvelle Entrée' }} 
          />
          <Stack.Screen 
            name="EntryDetails" 
            component={EntryDetailsScreen} 
            options={{ title: 'Détails de l’Entrée' }} 
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ title: 'Paramètres' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
