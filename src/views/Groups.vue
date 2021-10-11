<template>
	<div class="page">
		<h1>Группы</h1>
		<Table
			:storeName="storeName"
			:columns="GRPUPS_COLUMNS" 
			controlText="Добавить новую группу"
		>
			<template v-slot:form>
				<GroupForm
					:data="store.methods.getSelectedItem(storeName)"
					@submit="(form) => submit(form)"
				/>
			</template>
		</Table>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Table from '@/components/Table/Table.vue'
import { GRPUPS_COLUMNS } from '@/consts/columns'
import { State, Store } from '@/store/types'
import { Group } from '@/types/types'
import GroupForm from '@/components/GroupForm.vue'

export default defineComponent({
	name: 'Users',
	components: {
		Table,
		GroupForm
	},
	async setup() {
		const store = inject('store') as Store
		const storeName: keyof State = 'groups'

		const submit = async (form: Group) => {
			const selectedGroup = store.methods.getSelectedItem(storeName)
			if (selectedGroup) return store.methods.edit(storeName, form)
			store.methods.create(storeName, form)
		}

		await store.methods.get(storeName)

		return { storeName, GRPUPS_COLUMNS, submit, store }
	}
})
</script>
