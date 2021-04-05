import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "./components/Header";
import Cotizacion from "./components/Cotizacion";
import Formulario from "./components/Formulario";
import axios from "axios";

export default function App() {
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [consultarApi, setConsultarApi] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        //consultar API
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda},ETH&tsyms=${moneda}`;
        const resultados = await axios.get(url);
        setCargando(true);
        //spiner
        setTimeout(() => {
          setResultado(resultados.data.DISPLAY[criptomoneda][moneda]);
          setConsultarApi(false);
          setCargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarApi]);

  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5e49e2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.imagen}
        source={require("./assets/img/cryptomonedas.png")}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          setMoneda={setMoneda}
          criptomoneda={criptomoneda}
          setCriptomoneda={setCriptomoneda}
          setConsultarApi={setConsultarApi}
        />
      </View>
      <View style={{ marginTop: 40 }}>{componente}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%",
  },

  contenido: {
    marginHorizontal: "2.5%",
  },
});
