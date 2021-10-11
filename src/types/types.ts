export interface Column {
	id: number,
	name: string,
	label: string,
	sortable: boolean
}

export interface User {
	id: number,
	name: string,
	email: string,
	balance: number,
	groupId: number,
	createdAt: string,
}

export interface Group {
	id: number,
	name: string,
	comment: string,
	createdAt: string,
}

export type SortingOrder = 'asc' | 'desc'

export interface Sorting {
	name: string,
	order: SortingOrder
}
