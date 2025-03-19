<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
	id: String,
	title: String,
	body: String,
	priority: String,
	created_at: String,
	isCompleted: Boolean,
});

const emit = defineEmits(["checkbox-change"]);

const isChecked = ref(false);

const handleCheckboxChange = (event) => {
	isChecked.value = event.target.checked;
	emit("checkbox-change", props, isChecked.value);
	console.log("Checkbox changed");
};

const showUpdateModal = ref(false);
const changeUpdateVisibility = () => {
	showUpdateModal.value = !showUpdateModal.value;
};

onMounted(() => {
	console.log("props id TODOCaRD", props.id);
});

const priorityClass = computed(() => {
	return {
		"bg-green-300 hover:bg-green-400": props.priority === "low",
		"bg-yellow-300 hover:bg-yellow-400": props.priority === "medium",
		"bg-orange-300 hover:bg-orange-400": props.priority === "high",
		"bg-red-300 hover:bg-red-400": props.priority === "urgent",
	};
});
</script>

<template>
	<UpdateToDo
		v-if="showUpdateModal"
		@closeUpdate="changeUpdateVisibility"
		:id="id"
		:title="title"
		:body="body"
		:priority="priority"
		:created_at="created_at"
		:isCompleted="isCompleted"
	/>
	<div
		@click="changeUpdateVisibility"
		class="max-w-[600px] w-[90%] rounded-lg shadow-lg bg-gray-100 hover:bg-gray-200 p-4 flex justify-between cursor-pointer"
		:class="priorityClass"
	>
		<div class="flex items-center gap-3">
			<input
				type="checkbox"
				:checked="isChecked"
				@change="handleCheckboxChange"
				class="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer"
			/>
			<h3 class="text-lg font-semibold truncate">{{ title }}</h3>
		</div>
		<div>
			<div v-if="isCompleted" class="text-green-600 font-semibold">
				<Icon icon="fa6-solid:check" class="text-2xl text-green-500" />
			</div>

			<button
				v-else
				class="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-500 text-sm sm:text-base w-full sm:w-auto"
			>
				Mark as Done
			</button>
		</div>
	</div>
</template>

<style scoped></style>
