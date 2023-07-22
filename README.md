

# Pay-As-You-Read Thesis

This is a demo blog application that showcases how a pay-as-you-read model can be implemented using the Lightning Network. The application consists of a client application and a server application. The client application allows users to buy individual paragraphs of blog posts, while the server application handles the payment processing and content delivery.

## How it works

The pay-as-you-read model is implemented using the Lightning Network, a layer-2 payment protocol that allows for fast and cheap payments using Bitcoin. Users of the demo application need to have a Lightning Network wallet to be able to purchase paragraphs. We suggest that users use Alby, a Lightning Network wallet that is easy to use and has a user-friendly interface.

### How to run the application

The client application is a React application that can be run using the following commands:

```bash
cd client
npm install
npm run dev
```

The server application is a Node.js application that can be run using the following commands:

```bash
cd server
npm install
npm run dev
```

You will also need a Lightning Network account for the server. We suggest that you create one [here](https://app.regtest.getalby.com/) and place your address inside the server's `.env` file.

Lastly the user will need a LN wallet with a funded account. For this purpose he can add a funded test account - like the ones found [here](https://github.com/getAlby/lightning-browser-extension/wiki/Test-setup) - to his wallet.

## Future goals

We believe that abstracting this functionality into a JavaScript library-SDK will allow developers to easily integrate this pay-as-you-read feature into their applications.
