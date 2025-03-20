<script setup>
import { useTodoStore } from "../stores/todo";
const todoStore = useTodoStore();

const todos = computed(() => todoStore.todos.data);
const paginationLinks = computed(() => todoStore.todos.links || []);
const currentPage = computed(() => todoStore.todos.current_page || 1);
const lastPage = computed(() => todoStore.todos.last_page || 1);

onMounted(() => {
	todoStore.fetchTodos();
});

const ShowAddModal = ref(false);

const changeModalVisibility = () => {
	ShowAddModal.value = !ShowAddModal.value;
};

const checkedTodos = ref([]);

const handleCheckboxChange = (todo, isChecked) => {
	if (isChecked) {
		checkedTodos.value.push(todo);
	} else {
		checkedTodos.value = checkedTodos.value.filter((t) => t.id !== todo.id);
	}
};

const handleMarkAsDone = async (todo) => {
	await todoStore.markAsCompleted(todo.id);
};

const handleDeleteSelected = async () => {
	if (checkedTodos.value.length > 0) {
		const ids = checkedTodos.value.map((todo) => todo.id);
		await todoStore.deleteTodos(ids);
		checkedTodos.value = [];
	}
};

const handlePageChange = (page) => {
	todoStore.fetchTodos(page);
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
				@click="handleDeleteSelected"
				class="bg-red-500 px-5 py-2 font-semibold text-lg rounded-lg text-white hover:bg-red-600"
				:class="{ 'opacity-50 cursor-not-allowed': checkedTodos.length === 0 }"
			>
				Delete
			</button>
		</div>

		<div v-if="todoStore.loading" class="text-center text-gray-500">
			Loading...
		</div>

		<template v-else>
			<TodoCard
				v-for="todo in todos"
				:key="todo.id"
				:id="todo.id"
				:title="todo.title"
				:body="todo.body"
				:priority="todo.priority"
				:created_at="todo.created_at"
				:isCompleted="todo.is_completed === 1"
				@checkbox-change="handleCheckboxChange"
			/>

			<Pagination
				:links="paginationLinks"
				:current-page="currentPage"
				:last-page="lastPage"
				@page-change="handlePageChange"
			/>
		</template>

		<div v-if="todoStore.error" class="text-red-500 mt-4">
			{{ todoStore.error }}
		</div>
	</div>
</template>
