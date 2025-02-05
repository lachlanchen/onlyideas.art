<script setup lang="ts">
import '@/assets/main.css';
import { onMounted, ref } from 'vue';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

// Reactive reference to store the list of todos.
const todos = ref<Array<Schema['Todo']["type"]>>([]);

// Function to fetch and observe todos.
function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items }) => {
      todos.value = items;
    },
    error: (error) => {
      console.error("Error fetching todos:", error);
    },
  });
}

// Function to create a new todo.
function createTodo() {
  const content = window.prompt("Todo content");
  if (!content) return;
  client.models.Todo.create({
    content: content
  })
  .then(() => {
    listTodos();
  })
  .catch((error) => {
    console.error("Error creating todo:", error);
  });
}

// Function to delete a todo after confirmation.
function deleteTodo(todoId: string) {
  if (confirm("Are you sure you want to delete this todo?")) {
    client.models.Todo.delete({ id: todoId })
      .then(() => {
        listTodos();
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  }
}

// Fetch todos when the component is mounted.
onMounted(() => {
  listTodos();
});
</script>

<template>
  <main>
    <h1>My todos</h1>
    <button @click="createTodo">+ new</button>
    <ul>
      <!-- Each todo item will call deleteTodo(todo.id) on click -->
      <li 
        v-for="todo in todos" 
        :key="todo.id"
        @click="deleteTodo(todo.id)"
        style="cursor: pointer;">
        {{ todo.content }}
      </li>
    </ul>
    <div>
      🥳 App successfully hosted. Try creating a new todo.
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
