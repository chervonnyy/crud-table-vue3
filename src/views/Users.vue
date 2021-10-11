<template>
	<div class="page">
		<h1>Пользователи</h1>
		<Table
			:storeName="storeName"
			:columns="USERS_COLUMNS"
			controlText="Добавить нового пользователя"
		>
			<template v-slot:form>
				<UserForm 
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
import UserForm from '@/components/UserForm.vue'
import { USERS_COLUMNS } from '@/consts/columns'
import { State, Store } from '@/store/types'
import { User } from '@/types/types'

export default defineComponent({
	name: 'Users',
	components: {
		Table,
		UserForm,
	},
	async setup() {
		const store = inject('store') as Store
		const storeName: keyof State = 'users'

		const submit = async (form: User) => {
			const selectedUser = store.methods.getSelectedItem(storeName)
			if (selectedUser) return store.methods.edit(storeName, form)
			store.methods.create(storeName, form)
		}

		await store.methods.get(storeName)

		return { store, storeName, USERS_COLUMNS, submit }
	}
})
</script>
