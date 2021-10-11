<template>
	<form id="form" @submit="handleSubmit">
		<p>
			<b>Имя:</b><br>
			<input
				v-model="form.name"
				required
				type="text" 
				class="input"
			>
		</p>
		<p>
			<b>Email:</b><br>
			<input
				v-model="form.email"
				required
				class="input"
				type="text" 
			>
		</p>
		<p>
			<b>Баланс:</b><br>
			<input
				v-model="form.balance"
				required
				type="number" 
				class="input"
			>
		</p>
		<p>
			<b>Группа:</b><br>
			<select 
				v-model="form.groupId"
				class="input"
				required
			>
				<option value="" disabled selected>Выберите группу</option>
				<option
					v-for="option in groups"
					:key="option.id"
					:value="option.id"
					:label="option.name"
				/>
			</select>
		</p>
		<p>
			<button
				type="submit" 
				form="form"
				class="input"
			>
				Сохранить
			</button>
		</p>
	</form>
</template>

<script lang="ts">
import { Store } from '@/store/types'
import { Group, User } from '@/types/types'
import { computed, defineComponent, inject, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'UserForm',
	props: {
		data: {
			type: Object as () => User,
			required: false,
		},
		groups: {
			type: Array as () => Group[],
			required: true,
		}
	},
	emits: ['submit'],
	setup(props, context) {
		const store = inject('store') as Store
		const router = useRouter()
		const form = reactive(props.data || {
			id: Math.floor(Math.random() * 1000),
			name: '',
			email: '',
			balance: '',
			groupId: '',
			createdAt: new Date(),
		})

		const groups = computed(() => store.state.groups.items)

		// получения списка групп для автокомплита
		store.methods.get('groups')

		const handleSubmit = (e: Event) => {
			e.preventDefault()
			context.emit('submit', form)
			router.replace({ query: { 'open-dialog': 'false' } })
		}

		return { form, handleSubmit, store, groups }
	},
})
</script>

<style scoped>
.input {
	font-size: 16px;
	padding: 5px;
	width: 350px;
	margin-bottom: 10px;
}
</style>
