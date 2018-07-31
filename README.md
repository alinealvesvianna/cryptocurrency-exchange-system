# Cryptocurrency exchange recomedation system

## Descrição
Conversor de criptomoedas desenvolvido com atomic design, react, styled components, redux e storybook.

## Sumário

- [Configuração](#configuração)
- [Comandos](#comandos)

## Configuração
Como configurar o projeto localmente.

### Ambiente e config.env.js
O arquivo `config.env.js` _seta_ o valor da variável de ambiente em que o projeto está. Por exemplo: ao executar `npm run build:staging` o valor da variável `NODE_ENV` _setada_ no arquivo será reescrita para `'staging'`..
```javascript
export default {NODE_ENV:  'development'}
```

## Comandos
Linhas de comando úteis no desenvolvimento e lançamento do site

1. Construir app:
```npm run build:```+```ambiente```
> Ambientes : `development`,  `staging` e `production`
> Exemplos: 
> Para realizar _build_ no ambiente de **homologação**: `npm run build:staging`
> Para _build_ no ambiente de **desenvolvimento**: `npm start` ou `npm run dev`

2. Rodar _dev_ server:
```npm start``` ou ```npm run dev```

> Ao salvar alterações o projeto realizar um live reload. Fique de atento aos logs no console, caso ocorram erros os mesmo aparecem lá.  
