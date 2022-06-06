# Teste Builders

Meu nome é Roger Felipe, sou desenvolvedor Fullstack Javascript e já trabalho com desenvolvimeto em tempo integral a pouco mais de 3 anos, eu criei esse projeto para atender um teste conforme especificações abaixo.
Utilizei o React Native init para criar o projeto com template em Typescript. Criei um layout no figma para ajudar na hora de desenhar as telas, mas no final acabei não seguindo o layout 100%.
Segue o link do figma (https://www.figma.com/file/CoAPTEbno9agNJi2O3wWIl/WeatherChallenge?node-id=0%3A1)

## ✔️ Técnicas e tecnologias utilizadas
- ``React Native``
- ``Typescript``

## Objetivos:

🎯 Desenvolva um aplicativo que consuma a localização atual do usuário e exiba na interface o endereço atual os dados climáticos da região e um botão para atualizar os dados.

- Para fazer essa busca, pode-se usar a API do Open Weather Map.

## Prazo:
- Indefinido.

## 📌 Condições

- Utilizar `React Native`
- É permitido o uso de outras libs
- Anexar **Print Screen** no Readme

## 📦 Outputs

- Repositório no [GITHUB](https://www.notion.so/GITHUB-4d23c6fae3f945bc82b7a3832f205d50)
- Documentação

## 🙌 Diferenciais

- Arquitetura
- Documentação
- Interface
- Testes

## Imagens
| iOs  |  Android  |
| ------------------- | ------------------- |
|  <img src="https://i.imgur.com/wswxdYi.jpeg" width="180"> |  <img src="https://i.imgur.com/3lPuHcS.png" width="180"> |

## Testar o projeto

- Foi utilizada a API do OpenWeather, você precisa de uma API Key, basta se cadastrar aqui (https://home.openweathermap.org/api_keys).
- Também foi utilizada uma API para transformar coordenadas em endereço, cadastre-se para conseguir uma API KEY aqui (https://my.locationiq.com/)
- Após o cadastro você deve criar um arquivo .env na raíz do projeto com a seguinte estrutura:
```
WEATHER_API_KEY=sua_key_aqui
REVERSE_GEOCODE_APIKEY=sua_key_aqui
```
- Instalar as dependências do projeto

|         Com Yarn    |      Com Npm         |
|---------------------|----------------------|
|```yarn install```   |```npm install ```    |



## TODO:

- [ ] Adicionar temas (dark/light)
- [ ] Adicionar Icone para o app
- [ ] TDD
- [ ] Tests E2E
