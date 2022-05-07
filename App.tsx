import { useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter';

import { theme } from './src/theme';
import { Widget } from './src/components/Widget';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(()=>{
    async function prepare() {
      if(!fontsLoaded) {
        //Segura a splash screen até que as fontes sejam carregadas
        await SplashScreen.preventAutoHideAsync();
        // await new Promise(resolve => setTimeout(resolve, 2000));
      }
    };
    
    prepare();
  }, []);
  
  useEffect(()=>{
    async function prepare() {
      if(fontsLoaded) {
        //Remove a splashscreen quando a fonte for carregda
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Widget />
      <StatusBar 
        style="light"
        backgroundColor='transparent'
        translucent
      />
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