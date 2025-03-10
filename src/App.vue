<script setup>
import { ref, computed } from 'vue';

import Task from './components/Task.vue';
import Filter from './components/Filter.vue';

const appName = "  Tasks Manager";

const tasks = ref([
  {
    id: 1,
    name: "Website design",
    description: "Define the style guide, branding and create the webdesign on Figma.",
    completed: true
  },
  {
    id: 2,
    name: "Website development",
    description: "Develop the portfolio website using Vue JS.",
    completed: false
  },
  {
    id: 3,
    name: "Hosting and infrastructure",
    description: "Define hosting, domain and infrastructure for the portfolio website.",
    completed: false
  },
  {
    id: 4,
    name: "Composition API",
    description: "Learn how to use the composition API and how it compares to the options API.",
    completed: true
  },
  {
    id: 5,
    name: "Pinia",
    description: "Learn how to setup a store using Pinia.",
    completed: true
  },
  {
    id: 6,
    name: "Groceries",
    description: "Buy rice, apples and potatos.",
    completed: false
  },
  {
    id: 7,
    name: "Bank account",
    description: "Open a bank account for my freelance business.",
    completed: false
  }
]);

let newTask = {
  completed: false,
};

let filterBy = ref("");
const filteredTasks = computed(() => {
  switch (filterBy.value) {
    case "todo":
      return tasks.value.filter(task => !task.completed);
    case "done":
      return tasks.value.filter(task => task.completed);
    default:
      return tasks.value;
  };
});

function addTask() {
  // validation
  if (newTask.name && newTask.description) {
    newTask.id = Math.max(...tasks.value.map(task => task.id)) + 1;

    tasks.value.push(newTask);

    // 重置
    newTask = {
      completed: false,
    };
  } else {
    alert("Please fill in all fields.");
  };
};

function toggleCompleted(id) {
  tasks.value.forEach(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  })
};

function setFilter(value) {
  filterBy.value = value;
};

</script>

<template>

  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>
          {{ appName }}
        </h1>
      </div>
    </div>

    <Filter @setFilter="setFilter" :filterBy="filterBy" />

    <div class="tasks">
      <Task @toggleCompleted="toggleCompleted" v-for="(task, index) in filteredTasks" :key="task.id" :task="task" />
    </div>

    <div class="add-task">
      <h3>Add a new task</h3>
      <input v-model="newTask.name" type="text" name="title" placeholder="Enter a title..."><br />
      <textarea v-model="newTask.description" name="description" rows="4" placeholder="Enter a description..." /><br />
      <button @click="addTask" class="btn gray">Add Task</button>
    </div>
  </main>
</template>


<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }

}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input,
  textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}
</style>