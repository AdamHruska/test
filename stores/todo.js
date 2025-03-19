import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useTodoStore = defineStore("todo", {
	state: () => ({
		todos: {
			data: [],
			links: [],
			current_page: 1,
			last_page: 1,
			per_page: 5,
			total: 0,
		},
		loading: false,
		error: null,
	}),

	actions: {
		async fetchTodos(page = 1) {
			this.loading = true;
			this.error = null;
			try {
				const { $api } = useNuxtApp();
				const response = await $api.get("todo-records", {
					params: { page },
				});

				this.todos = response.data;
			} catch (err) {
				this.error = "Failed to load todos";
				console.error(err);
			} finally {
				this.loading = false;
			}
		},

		async addTodo(todo) {
			try {
				const { $api } = useNuxtApp();
				const response = await $api.post("todo-records", todo);
				if (response.status === 201) {
					toast.success("Todo added successfully");
				} else {
					toast.error("Failed to add todo");
				}
				await this.fetchTodos(this.todos.current_page);
			} catch (err) {
				this.error = "Failed to add todo";
				console.error(err);
			}
		},

		async updateTodo(id, updatedTodo) {
			try {
				const { $api } = useNuxtApp();
				const response = await $api.put(`todo-records/${id}`, updatedTodo);
				if (response.status === 200) {
					toast.success("Todo updated successfully");
				} else {
					toast.error("Failed to update todo");
				}
				await this.fetchTodos(this.todos.current_page);
			} catch (err) {
				this.error = "Failed to update todo";
				console.error(err);
			}
		},

		async deleteTodo(id) {
			try {
				const { $api } = useNuxtApp();
				const response = await $api.delete(`todo-records/${id}`);
				if (response.status === 204) {
					toast.success("Todo deleted successfully");
				} else {
					toast.error("Failed to delete todo");
				}

				await this.fetchTodos(this.todos.current_page);
			} catch (err) {
				this.error = "Failed to delete todo";
				console.error(err);
			}
		},

		async deleteTodos(ids) {
			try {
				const { $api } = useNuxtApp();
				await $api.delete(`todo-records`, { data: { ids } });

				await this.fetchTodos(this.todos.current_page);
			} catch (err) {
				this.error = "Failed to delete todos";
				console.error(err);
			}
		},

		async markAsCompleted(id) {
			try {
				const { $api } = useNuxtApp();
				const response = await $api.put(`todo-records/${id}/complete`);
				if (response.status === 201) {
					toast.success("Task marked as completed");
				} else {
					toast.error("Failed to mark as completed");
				}
				await this.fetchTodos(this.todos.current_page);
			} catch (err) {
				this.error = "Failed to mark todo as completed";
				console.error(err);
			}
		},
	},
});
