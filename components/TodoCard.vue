<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
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
</script>

<template>
	<div class="w-[600px] rounded-lg shadow-lg bg-white p-4 flex justify-between">
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
				class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500"
			>
				Mark as Done
			</button>
		</div>
	</div>
</template>

<style scoped></style>
