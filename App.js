import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { TextInput, Divider } from "react-native-paper";

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
        label="Digite o CEP"
        placeholder="123456789"
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
          <TextInput
            label="CEP"
            value={dadosCep.cep}
            editable={false}
            style={{ marginBottom: 10 }}
          />
          <Divider />
          <TextInput
            label="Logradouro"
            value={dadosCep.logradouro}
            editable={false}
            style={{ marginBottom: 10 }}
          />
          <Divider />
          <TextInput
            label="Bairro"
            value={dadosCep.bairro}
            editable={false}
            style={{ marginBottom: 10 }}
          />
          <Divider />
          <TextInput
            label="Cidade"
            value={dadosCep.localidade}
            editable={false}
            style={{ marginBottom: 10 }}
          />
          <Divider />
          <TextInput
            label="Estado"
            value={dadosCep.uf}
            editable={false}
            style={{ marginBottom: 10 }}
          />
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
    width: 250,
    marginBottom: 15,
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
 