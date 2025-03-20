<script setup>
import { Icon } from "@iconify/vue";
import { useTodoStore } from "../stores/todo";
const todoStore = useTodoStore();

const props = defineProps({
	id: String,
});

const emit = defineEmits(["showDeleteConfirm"]);

const handleDelete = async () => {
	try {
		await todoStore.deleteTodo(props.id);
	} catch (error) {
		console.error("Failed to delete todo:", error);
	}
};
</script>
<template>
	<div
		class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
	>
		<div class="bg-white rounded-lg shadow-lg w-full max-w-md">
			<div class="p-4 flex justify-between items-center px-8">
				<h2 class="text-xl font-semibold">
					Are you sure you want to delete this activity?
				</h2>
				<Icon
					@click="emit('showDeleteConfirm')"
					icon="fa6-solid:x"
					class="text-2xl cursor-pointer text-slate-600 hover:text-black"
				/>
			</div>
			<div class="p-4 flex justify-end gap-8 items-center px-8">
				<button
					@click="emit('showDeleteConfirm')"
					class="bg-blue-600 text-white px-3 py-3 sm:px-4 sm:py-2 rounded-md hover:bg-blue-500 text-sm sm:text-base w-full sm:w-auto"
				>
					Cancel
				</button>
				<button
					@click="handleDelete"
					class="bg-red-600 text-white px-3 py-3 sm:px-4 sm:py-2 rounded-md hover:bg-red-500 text-sm sm:text-base w-full sm:w-auto"
				>
					Delete
				</button>
			</div>
		</div>
	</div>
</template>
