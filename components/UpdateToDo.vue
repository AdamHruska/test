<script setup>
import { Icon } from "@iconify/vue";
import { useTodoStore } from "../stores/todo";

const todoStore = useTodoStore();

const props = defineProps({
	id: String,
	title: String,
	body: String,
	priority: String,
	created_at: String,
	isCompleted: Boolean,
});

const emit = defineEmits(["closeUpdate"]);

const closeUpdateModal = () => {
	emit("closeUpdate");
};

const form = ref({
	title: props.title || "",
	body: props.body || "",
	is_completed: props.isCompleted ? 1 : 0,
	priority: props.priority || "low",
});

const handleSubmit = async () => {
	try {
		if (!form.value.title) {
			return;
		}

		await todoStore.updateTodo(props.id, form.value);

		closeUpdateModal();
	} catch (error) {
		console.error("Failed to update todo:", error);
	}
};

const handleDelete = async () => {
	try {
		await todoStore.deleteTodo(props.id);
		closeUpdateModal();
	} catch (error) {
		console.error("Failed to delete todo:", error);
	}
};
</script>

<template>
	<div
		class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
	>
		<div class="bg-white rounded-lg shadow-lg w-full max-w-md">
			<div class="p-4 flex justify-between items-center px-8">
				<h2 class="text-xl font-semibold">Update Todo</h2>
				<Icon
					@click="closeUpdateModal"
					icon="fa6-solid:x"
					class="text-2xl cursor-pointer text-slate-600 hover:text-black"
				/>
			</div>

			<div class="p-4">
				<form @submit.prevent="handleSubmit">
					<div class="mb-4">
						<label for="title" class="block text-sm font-medium text-gray-700"
							>Title</label
						>
						<input
							v-model="form.title"
							type="text"
							id="title"
							placeholder="Enter title"
							class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div class="mb-4">
						<label for="body" class="block text-sm font-medium text-gray-700"
							>Description</label
						>
						<textarea
							v-model="form.body"
							id="body"
							placeholder="Enter description"
							rows="3"
							class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>

					<div class="mb-4">
						<label
							for="priority"
							class="block text-sm font-medium text-gray-700"
							>Priority</label
						>
						<select
							v-model="form.priority"
							id="priority"
							class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
							<option value="urgent">Urgent</option>
						</select>
					</div>

					<div class="flex justify-end gap-2">
						<button
							@click.prevent="handleDelete"
							type="button"
							class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
						>
							Delete
						</button>
						<button
							type="submit"
							class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
