/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  setCriptomoneda,
  setMoneda,
  consultarAPI,
  setconsultarAPI,
}) => {
  const [cryptomonedas, setCryptomonedas] = useState([]);

  useEffect(() => {
    const getCryptos = async () => {
      const response = await axios.get(
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD',
      );
      setCryptomonedas(response.data.Data);
    };
    getCryptos();
  }, []);

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlert();
      return;
    }
    //pasa la validacion
    setconsultarAPI(true);
  };

  const mostrarAlert = () => {
    Alert.alert('Error', 'Ambos campos son obligatorios', [
      {
        text: 'OK',
      },
    ]);
  };
  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker onValueChange={mon => setMoneda(mon)} selectedValue={moneda}>
        <Picker.Item label="--Seleccione--" value="" />
        <Picker.Item label="Dolar" value="USD" />
        <Picker.Item label="Peso Argentino" value="ARS" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        onValueChange={crypto => setCriptomoneda(crypto)}
        selectedValue={criptomoneda}>
        <Picker.Item label="--Seleccione--" value="" />
        {cryptomonedas.map(c => (
          <Picker.Item
            key={c.CoinInfo.Id}
            label={c.CoinInfo.FullName}
            value={c.CoinInfo.Name}
          />
        ))}
      </Picker>
      <View>
        <TouchableHighlight
          style={styles.btnCotizar}
          onPress={() => cotizarPrecio()}>
          <Text style={styles.txtCotizar}>Cotizar</Text>
        </TouchableHighlight>
      </View>
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
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  txtCotizar: {
    color: '#FFF',
    fontFamily: 'Lato-Black',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default Formulario;
