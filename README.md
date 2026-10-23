# FATEC - Atividade de API REST para Dispositivos Móveis I

## Descrição da atividade

Esta atividade foi desenvolvida como uma demonstração prática dos conceitos
abordados na disciplina de **Programação de Dispositivos Móveis I**. O projeto
apresenta a integração entre um aplicativo mobile e uma API REST, utilizando
como exemplo o registro de doações de tampinhas plásticas.

O usuário informa o peso da doação, em quilogramas, e o identificador do ponto
de coleta pelo aplicativo. Essas informações são enviadas para o backend, que
valida os dados, estima a quantidade de tampinhas e retorna o registro criado
para exibição no aplicativo.

## Objetivos

- Demonstrar a comunicação entre um aplicativo mobile e um servidor HTTP.
- Aplicar o consumo de uma API REST por meio de uma requisição `POST`.
- Trabalhar com entrada de dados, validação e tratamento de erros.
- Exibir no aplicativo os dados retornados pelo backend.
- Utilizar uma situação prática relacionada à sustentabilidade e à reciclagem.

## Tecnologias utilizadas

- **Mobile:** React Native, Expo, Expo Router e TypeScript.
- **Backend:** Node.js, Express e JavaScript.
- **Comunicação:** API REST utilizando JSON e CORS.

## Funcionamento

O aplicativo possui uma tela para registrar a doação. Antes do envio, o cliente
verifica se o peso é maior que zero e se o ponto de coleta foi informado.
Depois, realiza uma requisição para a API.

O servidor também valida os dados recebidos e calcula uma estimativa de
tampinhas utilizando a regra:

```text
quantidade estimada = (peso em kg × 1000) ÷ 2
```

O registro retornado contém:

- identificador da doação;
- peso informado;
- ponto de coleta;
- quantidade estimada de tampinhas;
- data e hora do registro.

Os dados são armazenados temporariamente em memória, portanto são perdidos
quando o servidor é reiniciado. Essa abordagem é suficiente para a
demonstração dos conceitos de integração mobile e API REST.

## Endpoints da API

### Verificar o status da API

```http
GET /
```

Retorna uma mensagem informando que a API está disponível.

### Registrar uma doação

```http
POST /doacoes
Content-Type: application/json
```

Exemplo de corpo da requisição:

```json
{
  "peso": 0.69,
  "localId": "PONTO-001"
}
```

### Consultar as doações registradas

```http
GET /doacoes
```

Retorna a quantidade total e a lista de doações armazenadas durante a execução
do servidor.

## Como executar

### Backend

No diretório do backend, instale as dependências e inicie o servidor:

```bash
cd backend
npm install
node server.js
```

O servidor ficará disponível na porta `3000`.

### Aplicativo mobile

Em outro terminal, instale as dependências e inicie o Expo:

```bash
cd mobile
npm install
npx expo start
```

Para executar em um dispositivo físico, o endereço configurado em
`mobile/src/app/index.tsx` deve apontar para o endereço IP da máquina que está
executando o backend. O dispositivo e o computador precisam estar na mesma
rede. Em um emulador Android, pode ser utilizado o endereço `10.0.2.2` para
acessar o localhost do computador, conforme o ambiente de execução.

## Estrutura do projeto

```text
backend/
  server.js       # API REST e regras de negócio
  package.json    # Dependências e scripts do backend

mobile/
  src/app/
    index.tsx     # Tela de registro e consumo da API
  package.json    # Dependências e scripts do aplicativo
```

## Resultado esperado

Ao preencher o peso e o ponto de coleta e selecionar **Registrar doação**, o
aplicativo envia os dados para a API. Em caso de sucesso, são apresentados o
identificador, o peso, o ponto de coleta, a estimativa de tampinhas e a data do
registro. Caso os dados sejam inválidos ou a API não esteja acessível, uma
mensagem de erro é exibida ao usuário.