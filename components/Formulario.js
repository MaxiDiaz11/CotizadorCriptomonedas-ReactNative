/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [criptomonedas, setCriptomonedas] = useState('');

  useEffect(() => {
    const getCryptos = async () => {
      const response = await axios.get(
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD',
      );
      setCriptomonedas(response.data.Data);
    };
    getCryptos();
  }, []);

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        onValueChange={moneda => setMoneda(moneda)}
        selectedValue={moneda}
        itemStyle={{height: 120}}>
        <Picker.Item label="--Seleccione--" value="" />
        <Picker.Item label="Dolar" value="USD" />
        <Picker.Item label="Peso Argentino" value="ARS" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        onValueChange={crypto => setCriptomoneda(crypto)}
        selectedValue={criptomoneda}
        itemStyle={{height: 120}}>
        <Picker.Item label="--Seleccione--" value="" />
        {criptomonedas.map(c => (
          <Picker.Item
            key={c.CoinInfo.Id}
            label={c.CoinInfo.FullName}
            value={c.CoinInfo.Name}
          />
        ))}
      </Picker>
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
