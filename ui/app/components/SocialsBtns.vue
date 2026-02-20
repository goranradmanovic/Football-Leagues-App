<template>
	<div class="flex gap-1">
		<Button as="a" v-for="(btn, index) in btnsConfig" :key="index" :icon="btn?.iconName" :href="btn?.url" target="_blank" rel="noopener" variant="link" class="text-800 no-underline" />
	</div>
</template>

<script setup lang="ts">
	interface ButtonConfig {
		iconName: string;
		url: string;
	}

	const props = defineProps<{
		btnsConfig: ButtonConfig[];
	}>();
</script>