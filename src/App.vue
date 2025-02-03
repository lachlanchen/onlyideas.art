<!-- Auth.vue -->
<template>
  <!-- The Authenticator component wraps your app’s protected content.
       It displays the sign‑in/sign‑up UI until the user is authenticated. -->
  <authenticator>
    <!-- The slot provides access to the current auth state -->
    <template v-slot="{ user, signOut }">
      <div v-if="user">
        <h1>Welcome, {{ user.username }}!</h1>
        <p>You are successfully logged in.</p>
        <!-- For example, include a sign-out button -->
        <button @click="signOut">Sign Out</button>
        <!-- Insert additional protected content here -->
      </div>
    </template>
  </authenticator>
</template>

<script setup>
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
</script>
