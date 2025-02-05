<template>
  <main>
    <h1>Creators</h1>
    <button @click="createCreator">+ Add New Creator</button>
    <ul>
      <li v-for="creator in creators" :key="creator.id">
        {{ creator.name }}
      </li>
    </ul>
    <div>
      <p>More features coming soon: subscribe and view creator profiles.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

// Reactive reference to store the list of creators.
const creators = ref<Array<Schema['Creator']["type"]>>([]);

/**
 * createCreator prompts the user for a creator name and an optional bio,
 * then creates a new creator record using the Amplify Data client.
 */
function createCreator(): void {
  const name = window.prompt("Enter the creator's name:");
  if (!name) return;
  const bio = window.prompt("Enter a brief bio for the creator (optional):") || "";
  client.models.Creator.create({
    name: name,
    bio: bio,
  })
  .then(() => {
    // Refresh the list of creators after successful creation.
    listCreators();
  })
  .catch((error) => {
    console.error("Error creating creator:", error);
  });
}

/**
 * listCreators observes the Creator model and updates the local
 * creators array. This function prepares for future enhancements such as
 * listing and subscribing to creators.
 */
function listCreators(): void {
  client.models.Creator.observeQuery().subscribe({
    next: ({ items }) => {
      creators.value = items;
    },
    error: (error: any) => {
      console.error("Error fetching creators:", error);
    },
  });
}

// Initialize the creators list when the component is mounted.
onMounted(() => {
  listCreators();
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
</style>
