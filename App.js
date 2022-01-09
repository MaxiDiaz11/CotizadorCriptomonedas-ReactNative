import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Formulario from './components/Formulario';
import Header from './components/Header';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [criptomoneda, setCriptomoneda] = useState('');
  const [moneda, setMoneda] = useState('');
  const [consultarAPI, setconsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        //api para cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const response = await axios.get(url);
        setCargando(true);
        //ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          setResultado(response.data.DISPLAY[criptomoneda][moneda]);
          setconsultarAPI(false);
          setCargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI, criptomoneda, moneda]);

  //mostrar spinner o resultado
  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          source={require('./assets/img/cryptomonedas.png')}
          style={styles.imagen}
        />
        <View style={styles.contenedor}>
          <Formulario
            criptomoneda={criptomoneda}
            moneda={moneda}
            consultarAPI={consultarAPI}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            setconsultarAPI={setconsultarAPI}
          />
        </View>
        <View style={{marginTop: 40}}>{componente}</View>
      </ScrollView>
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
