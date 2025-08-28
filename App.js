import { useState } from "react";
import { View } from "react-native";
import { TextInput, Divider, Button, Text, Card, Surface, useTheme } from "react-native-paper";

export default function App() {
  const [cep, setCep] = useState("");
  const [dadosCep, setDadosCep] = useState([]);
  const theme = useTheme();

  const buscaCep = (value) => {
    const url = `https://viacep.com.br/ws/${value}/json/`;
    const formataCep = value.replace(/\D/g, "");

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDadosCep(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar CEP:", error);
      });
  };

  return (
    <Surface style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20, textAlign: "center" }}>
        Consulta de CEP
      </Text>

      <TextInput
        mode="outlined"
        label="Digite o CEP"
        placeholder="123456789"
        keyboardType="numeric"
        onChangeText={(text) => setCep(text)}
        style={{ width: 250, marginBottom: 15 }}
      />

      <Button 
        mode="contained" 
        onPress={() => buscaCep(cep)}
        style={{ marginBottom: 20 }}
      >
        Buscar
      </Button>

      {dadosCep.length === 0 ? (
        <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
          CEP não encontrado
        </Text>
      ) : (
        <Card style={{ width: "100%", maxWidth: 300 }}>
          <Card.Content>
            <TextInput
              mode="outlined"
              label="CEP"
              value={dadosCep.cep}
              editable={false}
              style={{ marginBottom: 10 }}
            />
            <Divider style={{ marginVertical: 5 }} />

            <TextInput
              mode="outlined"
              label="Logradouro"
              value={dadosCep.logradouro}
              editable={false}
              style={{ marginBottom: 10 }}
            />
            <Divider style={{ marginVertical: 5 }} />

            <TextInput
              mode="outlined"
              label="Bairro"
              value={dadosCep.bairro}
              editable={false}
              style={{ marginBottom: 10 }}
            />
            <Divider style={{ marginVertical: 5 }} />

            <TextInput
              mode="outlined"
              label="Cidade"
              value={dadosCep.localidade}
              editable={false}
              style={{ marginBottom: 10 }}
            />
            <Divider style={{ marginVertical: 5 }} />

            <TextInput
              mode="outlined"
              label="Estado"
              value={dadosCep.uf}
              editable={false}
              style={{ marginBottom: 10 }}
            />
          </Card.Content>
        </Card>
      )}
    </Surface>
  );
}
