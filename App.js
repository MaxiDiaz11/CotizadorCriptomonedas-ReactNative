import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Formulario from './components/Formulario';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Image
        source={require('./assets/img/cryptomonedas.png')}
        style={styles.imagen}
      />
      <View style={styles.contenedor}>
        <Formulario />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenedor: {
    marginHorizontal: '2.5%',
  },
});
export default App;
