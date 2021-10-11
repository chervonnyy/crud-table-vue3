<template>
	<tr class="header">
		<td
			v-for="column in columns" 
			:key="column.id"
			class="cell"
		>
			{{ column.label }}
			<span 
				v-if="column.sortable"
				class="sort"
				@click="updateSorting({ 
					name: column.name, 
					order: 'desc'
				})"
			>⬇️</span>
			<span 
				v-if="column.sortable"
				class="sort"
				@click="updateSorting({ 
					name: column.name, 
					order: 'asc'
				})"
			>⬆️</span>
		</td>
	</tr>
</template>

<script lang="ts">
import { State, Store } from '@/store/types'
import { Column, Sorting } from '@/types/types'
import { defineComponent, inject } from 'vue'

export default defineComponent({
	name: 'TableHeader',
	props: {
		columns: {
			type: Array as () => Column[],
			required: true,
		},
		storeName: {
			type: String as () =>  keyof State,
			required: true 
		}
	},
	setup(props) {
		const store = inject('store') as Store

		const updateSorting = (val: Sorting) => {
			store.methods.updateSorting(props.storeName, val)
		}

		return { updateSorting }
	}
})
</script>
