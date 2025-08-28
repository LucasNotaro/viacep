import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
 
export default function App() {
  const [cep, setCep] = useState("");
  const [dadosCep, setDadosCep] = useState([]);

  const buscaCep = (value) => {
    let url = `https://viacep.com.br/ws/${value}/json/`;
    let formataCep = value.replace(/\D/g, "");
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDadosCep(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar CEP:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consulta de CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        onChangeText={(text) => {
          setCep(text);
        }}
      />
      <Pressable style={styles.botao} onPress={() => buscaCep(cep)}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </Pressable>

      {dadosCep.length === 0 ? (
        <Text style={styles.mensagem}>CEP não encontrado</Text>
      ) : (
        <View style={styles.resultado}>
          <Text>CEP: {dadosCep.cep}</Text>
          <Text>Logradouro: {dadosCep.logradouro}</Text>
          <Text>Bairro: {dadosCep.bairro}</Text>
          <Text>Cidade: {dadosCep.localidade}</Text>
          <Text>Estado: {dadosCep.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    width: 250,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  botao: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  textoBotao: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  mensagem: {
    color: "#666",
    fontSize: 16,
  },
  resultado: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    maxWidth: 300,
  },

});
 