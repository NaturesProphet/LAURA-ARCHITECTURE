[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)[![Build Status](https://travis-ci.org/NaturesProphet/LAURA-ARCHITECTURE.svg?branch=master)](https://travis-ci.org/NaturesProphet/LAURA-ARCHITECTURE)[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mqc&metric=alert_status)](https://sonarcloud.io/dashboard?id=mqc)[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=mqc&metric=bugs)](https://sonarcloud.io/dashboard?id=mqc)[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=mqc&metric=code_smells)](https://sonarcloud.io/dashboard?id=mqc)[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=mqc&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=mqc)[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=mqc&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=mqc)[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=mqc&metric=security_rating)](https://sonarcloud.io/dashboard?id=mqc)[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=mqc&metric=sqale_index)](https://sonarcloud.io/dashboard?id=mqc)[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=mqc&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=mqc)

# Medicine Quality Control - mqc

## Descrição
Uma implementação da arquitetura IoT [L.A.U.R.A](https://laura-architecture.github.io/) para resolver o problema do [Medicine Quality Control](https://bit.ly/2TOp6lI) citado no convite para colaboração no projeto de Doutorado do Professor [Sérgio Teixeira](http://www.multicast.com.br/sergio/).

## Requisitos mínimos do sistema

<a href="https://nodejs.org/en/">Nodejs 8.11.3</a> ou superior  
<a href="https://nodejs.org/en/">npm 6.5.0</a> ou superior  

## Instalação das dependências
Entre no diretorio do projeto e rode esse comando no terminal
```bash
npm install
```

## Configurando o app
Abra o arquivo config.json e aponte os dados do seu cenário de teste local.

## Executando o app
após os passos anteriores, execute no terminal:

```bash
npm run start
```

Agora, na maquina Virtual (servidor simulado), abra o simulador (app em node) que está na area de trabalho.  
abra um terminal lá dentro, e execute a simulação 'c2'
```bash
yarn run c2
```

## Observações
Lembre de colocar a placa de rede da Maquina Virtual em modo 'Bridge' para que este projeto possa acessar a api que está la dentro.