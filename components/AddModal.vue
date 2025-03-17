<script setup>
import { Icon } from "@iconify/vue";
import { useTodoStore } from "../stores/todo";

const todoStore = useTodoStore();

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
	emit("closeModal");
};

const form = ref({
	title: "",
	body: "",
	is_completed: false,
	priority: "",
});

const handleSubmit = async () => {
	try {
		// Add the todo using the store
		await todoStore.addTodo(form.value);
		// Reset the form
		form.value = { title: "", description: "", priority: "low" };
		// Close the modal
		closeModal();
	} catch (error) {
		console.error("Failed to add todo:", error);
	}
};
</script>
<template>
	<!-- Modal Overlay -->
	<div
		class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
	>
		<!-- Modal Container -->
		<div class="bg-white rounded-lg shadow-lg w-full max-w-md">
			<!-- Modal Header -->
			<div class="p-4 flex justify-between items-center px-8">
				<h2 class="text-xl font-semibold">Add New Todo</h2>
				<Icon
					icon="fa6-solid:x"
					class="text-2xl cursor-pointer text-slate-600 hover:text-black"
				/>
			</div>

			<!-- Modal Body (Form) -->
			<div class="p-4">
				<form @submit.prevent="handleSubmit">
					<!-- Title Input -->
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

					<!-- Description Input -->
					<div class="mb-4">
						<label
							for="description"
							class="block text-sm font-medium text-gray-700"
							>Description</label
						>
						<textarea
							v-model="form.body"
							id="description"
							placeholder="Enter description"
							rows="3"
							class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>

					<!-- Priority Select -->
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

					<!-- Modal Footer (Buttons) -->
					<div class="flex justify-end gap-2">
						<button
							@click="closeModal"
							type="button"
							class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
						>
							Cancel
						</button>
						<button
							type="submit"
							class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Add Todo
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
