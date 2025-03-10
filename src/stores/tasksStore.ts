import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
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

    let filterBy = ref("");

    let newTask = {
        completed: false,
    };

    function setFilter(value: string) {
        filterBy.value = value;
    };

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

    function toggleCompleted(id: number) {
        tasks.value.forEach(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
        })
    };

    return { tasks, filterBy, setFilter, filteredTasks, addTask, toggleCompleted };
})