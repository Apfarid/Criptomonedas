import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableHighlight,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Cotizacion from "./Cotizacion";

const Formulario = ({
  moneda,
  setMoneda,
  criptomoneda,
  setCriptomoneda,
  setConsultarApi,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
  };

  const obtenerCriptomoneda = (moneda) => {
    setCriptomoneda(moneda);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === "" || criptomoneda.trim() === "") {
      mostrarAlerta();
      return;
    }
    setConsultarApi(true)
  };

  const mostrarAlerta = () => {
    Alert.alert("Error...", "Ambos campos son obligatorios", [{ text: "Ok" }]);
  };

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultados = await axios.get(url);
      setCriptomonedas(resultados.data.Data);
    };

    consultarApi();
  }, []);

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(moneda) => obtenerMoneda(moneda)}
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label="- Seleccione - " value="" />
        <Picker.Item label="- Dolar de Estados Unidos - " value="USD" />
        <Picker.Item label="- Peso Mexicano - " value="MXN" />
        <Picker.Item label="- Euro - " value="EUR" />
        <Picker.Item label="- Libra Esterlina - " value="GBP" />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={(cripto) => obtenerCriptomoneda(cripto)}
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label="- Seleccione -" value="" />
        {criptomonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>

      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}
      >
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textTransform: "uppercase",
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: "#5e49e2",
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },

  textoCotizar: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default Formulario;
