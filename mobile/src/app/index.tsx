
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Android Emulator: use 10.0.2.2 to access
// the host computer's localhost.
const API_URL = 'http://192.168.70.247:3000';

type Doacao = {
  id: number;
  peso: number;
  localId: string;
  quantidadeTampinhas: number;
  data: string;
};

export default function HomeScreen() {
  const [peso, setPeso] = useState('0.69');
  const [localId, setLocalId] = useState('PONTO-001');
  const [carregando, setCarregando] = useState(false);
  const [doacao, setDoacao] = useState<Doacao | null>(null);
  const [erro, setErro] = useState('');

  async function registrarDoacao() {
    const pesoNumerico = Number(peso.replace(',', '.'));

    if (!Number.isFinite(pesoNumerico) || pesoNumerico <= 0) {
      setErro('Informe um peso maior que zero.');
      setDoacao(null);
      return;
    }

    if (!localId.trim()) {
      setErro('Informe o ponto de coleta.');
      setDoacao(null);
      return;
    }

    setCarregando(true);
    setErro('');
    setDoacao(null);

    try {
      const resposta = await fetch(`${API_URL}/doacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          peso: pesoNumerico,
          localId: localId.trim(),
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.erro ?? `Erro HTTP ${resposta.status}`
        );
      }

      setDoacao(dados.doacao);
    } catch (e: unknown) {
      setErro(
        e instanceof Error
          ? e.message
          : 'Não foi possível conectar à API.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Doe suas Tampinhas</Text>
      <Text style={styles.subtitulo}>
        Demonstração de integração com API REST
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Peso da doação (kg)</Text>
        <TextInput
          style={styles.input}
          value={peso}
          onChangeText={setPeso}
          keyboardType="decimal-pad"
          placeholder="Ex.: 0.69"
        />

        <Text style={styles.label}>Ponto de coleta</Text>
        <TextInput
          style={styles.input}
          value={localId}
          onChangeText={setLocalId}
          autoCapitalize="characters"
          placeholder="Ex.: PONTO-001"
        />

        <Pressable
          style={styles.botao}
          onPress={registrarDoacao}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBotao}>
              Registrar doação
            </Text>
          )}
        </Pressable>

        {erro !== '' && (
          <Text style={styles.erro}>{erro}</Text>
        )}

        {doacao && (
          <View style={styles.resultado}>
            <Text style={styles.sucesso}>
              Doação registrada com sucesso!
            </Text>
            <Text>ID: {doacao.id}</Text>
            <Text>Peso: {doacao.peso} kg</Text>
            <Text>Ponto: {doacao.localId}</Text>
            <Text>
              Tampinhas estimadas: {doacao.quantidadeTampinhas}
            </Text>
            <Text>
              Data: {new Date(doacao.data).toLocaleString()}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F2F8F0',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#226B45',
    textAlign: 'center',
  },
  subtitulo: {
    textAlign: 'center',
    color: '#52645A',
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    gap: 12,
  },
  label: {
    fontWeight: '600',
    color: '#344B3A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B8CDBD',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#278653',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  erro: {
    color: '#A32121',
    marginTop: 8,
  },
  resultado: {
    backgroundColor: '#EDF8EF',
    padding: 14,
    borderRadius: 10,
    gap: 8,
    marginTop: 8,
  },
  sucesso: {
    color: '#226B45',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
