<template>
	<div class="table">
		<div class="control">
			<button @click="openDialog">
				{{ controlText || 'Добавить' }}
			</button>
		</div>
		<TableHeader
			:storeName="storeName"
			:columns="columns"
		/>
		<TableRow 
			v-for="row in store.state[storeName].items" 
			:key="row.ID"
			:data="row"
			:storeName="storeName"
			@edit="handleEdit"
		/>
		<div class="pagination">
			<button @click="store.methods.decreasePage(storeName)">
				предыдущая старнциа
			</button>
			<button @click="store.methods.increasePage(storeName)">
				следующая страница
			</button>
		</div>
	</div>
	<Popup 
		v-if="dialogIsVisible"
		@close="closePopup"
		title="Добавить"
	>
		<slot name="form" />
	</Popup>
</template>

<script lang="ts">
import { State, Store } from '@/store/types'
import { Column } from '@/types/types'
import { computed, defineComponent, inject } from 'vue'
import TableHeader from './TableHeader.vue'
import TableRow from './TableRow.vue'
import Popup from '../Popup.vue'
import UserForm from '../UserForm.vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
	name: 'Table',
	props: {
		columns: {
			type: Array as () => Column[],
			required: true,
		},
		storeName: {
			type: String as () => keyof State,
			required: true,
		},
		controlText: {
			type: String,
			required: false,
		}
	},
	components: {
		TableHeader,
		TableRow,
		Popup,
		UserForm
	},
	setup(props) {
		const store = inject('store') as Store
		const router = useRouter()
		const route = useRoute()

		const dialogIsVisible = computed(() => route.query?.['open-dialog'] === 'true')

		const openDialog = () => {
			router.replace({ query: { 'open-dialog': 'true' } })
		}

		const handleEdit = (id: number | null) => {
			openDialog()
			store.methods.updateSelectedItem(props.storeName, id)
		}

		const closePopup = () => {
			router.replace({ query: { 'open-dialog': 'false' } })
			store.methods.updateSelectedItem(props.storeName, null)
		}

		return { store, handleEdit, closePopup, openDialog, dialogIsVisible }
	},
})
</script>

<style>
.header {
	background: lightskyblue;
	color: #fff;
}
.row {
	display: grid;
	grid-auto-flow: column;
	border: 1px solid grey;
	border-top: none
}
.row:first-child {
	border-top: 1px solid grey;
}
.cell {
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.sort {
	cursor: pointer;
	margin-left: 5px;
}
.actions {
	display: flex;
	justify-content: center;
	align-items: center;
}
.actions button {
	margin: 0 5px;
	border-radius: 50%;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 8px;
	border-width: 1px;
	width: 25px;
	height: 25px;
}
.pagination {
	display: grid;
	grid-auto-flow: column;
	gap: 5px;
	justify-content: right;
	margin-top: 5px;
}
.control {
	width: 100%;
	display: flex;
	justify-content: right;
	margin-bottom: 10px;
}
.control button {
	padding: 5px 10px;
}
</style>
