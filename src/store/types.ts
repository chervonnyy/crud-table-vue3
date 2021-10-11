import { Group, Sorting, User } from "@/types/types";

export interface Store { 
	state: State, 
	methods: {
		get: (storeKey: keyof State) => Promise<void>,
		delete: (storeKey: keyof State, id: number) => Promise<void>
		edit: (storeKey: keyof State, form: User | Group) => Promise<void>
		create: (storeKey: keyof State, form: User | Group) => Promise<void>
		increasePage: (storeKey: keyof State) => void
		decreasePage: (storeKey: keyof State) => void
		updateSorting: (storeKey: keyof State, sorting: Sorting) => void
		updateSelectedItem: (storeKey: keyof State, val: number | null) => void
		getSelectedItem: (storeName: keyof State) => User | Group | undefined
	}
}

export interface State {
	users: StateItem<User>,
	groups: StateItem<Group>,
}

interface StateItem<T> {
	items: Array<T>,
	page: number,
	selectedItemID: number | null
	sort?: Sorting
}
