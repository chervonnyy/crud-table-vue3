import { reactive } from 'vue'
import { Group, Sorting, User } from '@/types/types'
import { State, Store } from './types'
import { BASE_URL } from '@/consts/url'

const state: State = reactive({
	users: {
		items: [],
		page: 1,
		selectedItemID: null,
	},
	groups: {
		items: [],
		page: 1,
		selectedItemID: null
	}
})

const methods = {
	increasePage(storeKey: keyof State) {
		// в конкретном примере знаем что у нас только 7 страниц
		if (state[storeKey].page === 7) return
		state[storeKey].page++
		this.get(storeKey)
	},
	decreasePage(storeKey: keyof State) {
		if (state[storeKey].page === 1) return
		state[storeKey].page--
		this.get(storeKey)
	},
	updateSorting(storeKey: keyof State, val: Sorting) {
		// @ts-ignore
		state[storeKey].sort = val
		state[storeKey].page = 1
		this.get(storeKey)
	},
	updateSelectedItem(storeKey: keyof State, val: number | null) {
		state[storeKey].selectedItemID = val
	},
	async get(storeKey: keyof State) {
		try {
			const response = await fetch(getUrl(storeKey))
			const items = await response.json() as User[]
			// @ts-ignore
			state[storeKey].items = items.map(item => ({
				...item, 
				createdAt: new Date(item.createdAt).toLocaleString()
			}))
		} catch (error) {
			console.error(error)
		}
	},
	async delete(storeKey: keyof State, ID: number) {
		try {
			const response = await fetch(`${BASE_URL}/${storeKey}/${ID}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
			})
			const success = await response.json()
			success && await this.get(storeKey)
		} catch(error) {
			console.error(error)
		}
	},
	async create(storeKey: keyof State, form: User | Group) {
		try {
			const response = await fetch(`${BASE_URL}/${storeKey}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
      			body: JSON.stringify(form)
			})
			const success = await response.json()
			success && await this.get(storeKey)
		} catch(error) {
			console.error(error)
		}
	},
	async edit(storeKey: keyof State, form: User | Group) {
		try {
			const response = await fetch(`${BASE_URL}/${storeKey}/${form.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
      			body: JSON.stringify(form)
			})
			const success = await response.json()
			success && await this.get(storeKey)
		} catch(error) {
			console.error(error)
		}
	},
	getSelectedItem(storeKey: keyof State): User | Group | undefined {
		const id = state[storeKey].selectedItemID
		// @ts-ignore
		if (id) return state[storeKey].items.find(item => item.id === id)
	}
}

const getUrl = (storeKey: keyof State): string => {
	// @ts-ignore
	const sorting = state[storeKey].sort ? `_sort=${state[storeKey].sort.name}&_order=${state[storeKey].sort.order}` : ''
	const pagination = `_page=${state[storeKey].page}&_limit=15`
	return `${BASE_URL}/${storeKey}?${sorting}${pagination}`
}

const store: Store = {
	state,
	methods,
}

export default store
