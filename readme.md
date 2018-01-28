# cool-bot


## Usage
export BOT_TOKEN=529208568:AAHLQZH9tUSt0ggIVAdHOdU-CiSB6v8kdhk

```sh
$ npm install
$ BOT_TOKEN='123:......' npm run dev
```

```sh
$ yarn
$ BOT_TOKEN='123:......' yarn dev
```

## Deployment

This bot can be deployed to [now](https://zeit.co/now) by Zeit.
Assuming you've got `now` installed and set up:

```sh
$ now -e BOT_TOKEN='123:......' /cool-bot
```

## Deployment

Additionaly you will need to run HyperLedger Compose Playground on localhost:3000
run composer-playground-rest server to provide rest API to playground (part of HyperLedger Fabric)
deploy network configured in https://github.com/hackathon-cyinsurtech/HyperLedger
after that /list comand in chatbot will provide you callback from HyperLedger Blockchain

## Using MarketplaceInsurance Bot

Telegram bot located in t.me/InsuranceMarketplaceBot


