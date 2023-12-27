/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import InputHighlighter from '@leyton-techlab/vue-input-highlighter';
import '@leyton-techlab/vue-input-highlighter/style.css';

import highlightInput from 'vue3-highlight-input';
import 'vue3-highlight-input/style.css';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.component("InputHighlighter", InputHighlighter);
app.use(highlightInput);

registerPlugins(app)

app.mount('#app')
