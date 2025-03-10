import { defineStore } from 'pinia'
import { computed, ref } from 'vue';

type Task = {
    id: number,
    name: string,
    description: string,
    completed: boolean
};

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));

    let filterBy = ref("");

    let modalIsActive = ref(false);

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

    function addTask(newTask: { name: string, description: string, completed: boolean, id: number }) {
        // validation
        if (newTask.name && newTask.description) {
            newTask.id = Math.max(...tasks.value.map(task => task.id), 0) + 1;

            tasks.value.push(newTask);

            closeModal();
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

    function openModal() {
        modalIsActive.value = true;
    };

    function closeModal() {
        modalIsActive.value = false;
    };

    return { tasks, filterBy, setFilter, filteredTasks, addTask, toggleCompleted, modalIsActive, openModal, closeModal };
})