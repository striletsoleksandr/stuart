import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'https://stuart-frontend-challenge.vercel.app/graphql/',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
