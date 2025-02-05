<template>
  <main id="app">
    <authenticator>
      <template v-slot="{ user, signOut }">
        <div v-if="user" class="authenticated">
          <header class="app-header">
            <h1>Hello {{ user?.signInDetails?.loginId }}'s ideas</h1>
          </header>
          <Ideas />
          <footer class="app-footer">
            <button class="sign-out" @click="signOut">Sign Out</button>
          </footer>
        </div>
      </template>
    </authenticator>
  </main>
</template>

<script setup lang="ts">
import Ideas from "./components/Ideas.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.authenticated {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.app-header {
  background-color: #42b983;
  color: white;
  padding: 1rem;
}

.app-footer {
  margin-top: auto;
  padding: 1rem;
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
</style>
