import 'react-native-gesture-handler';

import { useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter';

import { theme } from './src/theme';
import Widget from './src/components/Widget';

export default function App() {
  //Segura a splash screen até que as fontes sejam carregadas
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if(!fontsLoaded) {
    //não carregou as fontes ainda...
    return null;
  }
  
  //Remove a splashscreen quando a fonte for carregda
  SplashScreen.hideAsync();

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <StatusBar 
        style="light"
        backgroundColor='transparent'
        translucent
      />
      <Widget />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });