<template>
	<div class="flex items-center justify-center gap-2">
		<!-- Previous Button -->
		<button
			class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
			disabled
		>
			&larr; Previous
		</button>

		<!-- Page Numbers -->
		<button
			class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md"
		>
			1
		</button>
		<button
			class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
		>
			2
		</button>
		<button
			class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
		>
			3
		</button>

		<!-- Next Button -->
		<button
			class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
		>
			Next &rarr;
		</button>
	</div>
</template>
