<script setup lang="ts">
import '@/assets/main.css';
import { onMounted, ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

// Reactive reference to store the list of ideas.
const ideas = ref<Array<Schema['Idea']["type"]>>([]);

// Function to fetch and observe ideas.
function listIdeas() {
  client.models.Idea.observeQuery().subscribe({
    next: ({ items }) => {
      ideas.value = items;
    },
    error: (error) => {
      console.error("Error fetching ideas:", error);
    },
  });
}

// Function to create a new idea.
function createIdea() {
  const content = window.prompt("Idea content");
  if (!content) return;
  client.models.Idea.create({
    content: content
  })
  .then(() => {
    listIdeas();
  })
  .catch((error) => {
    console.error("Error creating idea:", error);
  });
}

// Function to delete a idea after confirmation.
function deleteIdea(ideaId: string) {
  if (confirm("Are you sure you want to delete this idea?")) {
    client.models.Idea.delete({ id: ideaId })
      .then(() => {
        listIdeas();
      })
      .catch((error) => {
        console.error("Error deleting idea:", error);
      });
  }
}

// Fetch ideas when the component is mounted.
onMounted(() => {
  listIdeas();
});
</script>

<template>
  <main>
    <h1>My ideas</h1>
    <button @click="createIdea">+ new</button>
    <ul>
      <!-- Each idea item will call deleteIdea(idea.id) on click -->
      <li 
        v-for="idea in ideas" 
        :key="idea.id"
        @click="deleteIdea(idea.id)"
        style="cursor: pointer;">
        {{ idea.content }}
      </li>
    </ul>
    <div>
      🥳 App successfully hosted. Try creating a new idea.
      <br />
      <a href="https://docs.amplify.aws/gen2/start/quickstart/nextjs-pages-router/">
        Review next steps of this tutorial.
      </a>
    </div>
  </main>
</template>

<style scoped>
/* You can adjust styles as needed */
ul {
  padding: 0;
  list-style: none;
}

li {
  background: white;
  margin: 4px 0;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.25s;
}

li:hover {
  background: #f0f0f0;
}
</style>
