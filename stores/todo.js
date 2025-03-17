import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useTodoStore = defineStore("todo", {
	state: () => ({
		todos: [],
		loading: false,
		error: null,
	}),

	actions: {
		async fetchTodos() {
			this.loading = true;
			this.error = null;
			try {
				const { $api } = useNuxtApp();
				const response = await $api.get("todo-records");
				this.todos = response.data;
			} catch (err) {
				this.error = "Failed to load todos";
			} finally {
				this.loading = false;
			}
		},

		async addTodo(todo) {
			try {
				const { $api } = useNuxtApp();
				const response = await $api.post("todo-records", todo);
				console.log("reponse", response.data);
				this.todos.push(response.data);
			} catch (err) {
				this.error = "Failed to add todo";
			}
		},

		async updateTodo(id, updatedTodo) {
			try {
				const { $api } = useNuxtApp();
				const response = await $api.put(`todo-records/${id}`, updatedTodo);
				this.todos = this.todos.map((todo) =>
					todo.id === id ? response.data : todo
				);
			} catch (err) {
				this.error = "Failed to update todo";
			}
		},

		async deleteTodo(id) {
			try {
				const { $api } = useNuxtApp();
				await $api.delete(`todo-records/${id}`);
				this.todos = this.todos.filter((todo) => todo.id !== id);
			} catch (err) {
				this.error = "Failed to delete todo";
			}
		},
	},
});
