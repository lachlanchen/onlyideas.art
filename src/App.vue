<template>
  <main id="app">
    <authenticator>
      <template v-slot="{ user, signOut }">
        <div v-if="user" class="authenticated">
          <header class="app-header">
            <h1>Hello {{ user?.signInDetails?.loginId }}'s ideas</h1>
            <button class="sign-out" @click="signOut">Sign Out</button>
          </header>
          <Ideas />
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
