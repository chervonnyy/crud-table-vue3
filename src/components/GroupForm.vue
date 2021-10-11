<template>
	<form id="form" @submit="handleSubmit">
		<p>
			<b>Название группы:</b><br>
			<input
				v-model="form.name"
				required
				type="text" 
				class="input"
			>
		</p>
		<p>
			<b>Комментарий:</b><br>
			<input
				v-model="form.comment"
				required
				type="text" 
				class="input"
			>
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
import { Group } from '@/types/types'
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'GroupForm',
	props: {
		data: {
			type: Object as () => Group,
			required: false,
		}
	},
	emits: ['submit'],
	setup(props, context) {
		const router = useRouter()
		const form = reactive(props.data || {
			id: Math.floor(Math.random() * 1000),
			name: '',
			comment: '',
			createdAt: new Date(),
		})

		const handleSubmit = (e: Event) => {
			e.preventDefault()
			context.emit('submit', form)
			router.replace({
				query: {
					'open-dialog': 'false'
				}
			})
		}

		return { form, handleSubmit }
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
