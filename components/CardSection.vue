<script setup>
import { useTodoStore } from "../stores/todo";
const todoStore = useTodoStore();

const todos = computed(() => todoStore.todos.data);

const ShowAddModal = ref(false);

const changeModalVisibility = () => {
	ShowAddModal.value = !ShowAddModal.value;
};
</script>

<template>
	<div class="p-4 flex flex-col items-center gap-4 pt-8 pb-16">
		<AddModal v-if="ShowAddModal" @closeModal="changeModalVisibility" />
		<div class="flex items-center gap-2">
			<button
				@click="changeModalVisibility"
				class="bg-green-500 px-5 py-2 font-semibold text-lg rounded-lg text-white hover:bg-green-600"
			>
				Add
			</button>
			<button
				class="bg-red-500 px-5 py-2 font-semibold text-lg rounded-lg text-white hover:bg-red-600"
			>
				Delete
			</button>
		</div>
		<TodoCard
			v-for="todo in todos"
			:key="todo.id"
			:title="todo.title"
			:body="todo.body"
			:priority="todo.priority"
			:created_at="todo.created_at"
			:isCompleted="todo.is_completed"
		/>
	</div>
</template>
