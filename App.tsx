import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Main from './src/screens/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  )
}