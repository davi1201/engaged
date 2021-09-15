import { createApp, h } from 'vue';
import { Quasar } from 'quasar';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import quasarUserOptions from './quasar-user-options';

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: process.env.VUE_APP_API_URL_GRAPHQL,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

const app = createApp({
  render: () => h(App),
});

app.use(Quasar, quasarUserOptions);
app.use(router);
app.use(apolloProvider);
app.mount('#app');
