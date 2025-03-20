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
	is_completed: 0,
	priority: "low",
});

const handleSubmit = async () => {
	try {
		if (!form.value.title) {
			return;
		}

		await todoStore.addTodo(form.value);

		form.value = { title: "", body: "", is_completed: 0, priority: "low" };

		closeModal();
	} catch (error) {
		console.error("Failed to add todo:", error);
	}
};
</script>

<template>
	<div
		class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
	>
		<div class="bg-white rounded-lg shadow-lg w-full max-w-md">
			<div class="p-4 flex justify-between items-center px-8">
				<h2 class="text-xl font-semibold">Add New Todo</h2>
				<Icon
					@click="closeModal"
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
							maxlength="255"
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
							@click.prevent="closeModal"
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
