<script setup>
defineProps({
	links: {
		type: Array,
	},
	currentPage: {
		type: Number,
	},
	lastPage: {
		type: Number,
	},
});

const emit = defineEmits(["pageChange"]);

const handlePageChange = (link) => {
	if (!link.url) return;

	const url = new URL(link.url);
	const page = url.searchParams.get("page");

	if (page) {
		emit("pageChange", Number(page));
	}
};
</script>

<template>
	<div class="flex justify-center mt-6">
		<div class="inline-flex rounded-md shadow">
			<ul class="flex">
				<li v-for="(link, index) in links" :key="index">
					<button
						@click="handlePageChange(link)"
						:class="[
							'px-4 py-2 text-sm font-medium border',
							link.active
								? 'bg-blue-600 text-white border-blue-600'
								: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
							!link.url && 'opacity-50 cursor-not-allowed',
							index === 0 ? 'rounded-l-md' : '',
							index === links.length - 1 ? 'rounded-r-md' : '',
						]"
						v-html="link.label"
					></button>
				</li>
			</ul>
		</div>
	</div>
</template>
