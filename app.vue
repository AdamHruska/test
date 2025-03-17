<script setup>
import { useTodoStore } from "./stores/todo";
const todoStore = useTodoStore();

onMounted(async () => {
	await todoStore.fetchTodos();
	//console.log(todoStore.todos.data);
});
</script>

<template>
	<LoadingComponent v-if="todoStore.loading" />
	<h1 class="text-center text-4xl font-semibold text-gray-800 py-4">
		ToDo List
	</h1>
	<SearchBar />

	<CardSection />

	<Pagination />
</template>
