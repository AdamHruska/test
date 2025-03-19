<script setup>
import { useToast } from "vue-toastification";
import { useTodoStore } from "./stores/todo";
const todoStore = useTodoStore();
const toast = useToast();

onMounted(async () => {
	await todoStore.fetchTodos();
});
</script>

<template>
	<LoadingComponent v-if="todoStore.loading" />
	<h1 class="text-center text-4xl font-semibold text-gray-800 py-4 w-full">
		ToDo List
	</h1>
	<SearchBar class="px-8" />

	<CardSection />

	<Pagination />
</template>
