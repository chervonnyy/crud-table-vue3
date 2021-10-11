<template>
	<div class="row">
		<div class="cell" v-for="cell in data" :key="cell">
			{{ cell }}
		</div>
		<div class="actions">
			<button @click="$emit('edit', data.id)">✏️</button>
			<button @click="store.methods.delete(storeName, data.id)">🗑️</button>
		</div>
	</div>
</template>

<script lang="ts">
import { State, Store } from '@/store/types'
import { defineComponent, inject } from 'vue'

export default defineComponent({
	name: 'TableRow',
	props: {
		data: {
			type: Object,
			required: true,
		},
		storeName: {
			type: String as () =>  keyof State,
			required: true,
		}
	},
	emits: ['edit'],
	setup() {
		const store = inject('store') as Store

		return { store }
	}
})
</script>
