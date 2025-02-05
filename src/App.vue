<template>
  <div id="app">
    <!-- The Amplify Authenticator component wraps your protected content.
         It displays the login UI until the user is authenticated. -->
    <authenticator>
      <!-- Use the default slot props to access the current auth state -->
      <template v-slot="{ user, signOut }">
        <!-- If the user is signed in, display the welcome message and todos -->
        <div v-if="user" class="authenticated">
          <header class="app-header">
            <h1>Welcome, {{ user.username }}!</h1>
            <button class="sign-out" @click="signOut">Sign Out</button>
          </header>
          <!-- Render your Todos component -->
          <Todos />
        </div>
        <!-- (Optional) You can include custom content when not authenticated
             but by default, the Authenticator will show its own sign-in/sign-up UI -->
      </template>
    </authenticator>
  </div>
</template>

<script setup lang="ts">
import Todos from "./components/Todos.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>

<style scoped>
/* Basic styling for the authenticated state */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.app-header {
  background-color: #42b983;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sign-out {
  background-color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  color: #42b983;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.sign-out:hover {
  background-color: #e0e0e0;
}

.authenticated {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
