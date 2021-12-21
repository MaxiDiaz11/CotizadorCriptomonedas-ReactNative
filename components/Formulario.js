/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Formulario = () => {
  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker>
        <Picker.Item label="--Seleccione--" value="" />
        <Picker.Item label="Dolar" value="USD" />
        <Picker.Item label="Peso Argentino" value="ARS" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
});

export default Formulario;
