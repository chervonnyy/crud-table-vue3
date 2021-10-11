import { Column } from "@/types/types";

export const USERS_COLUMNS: Column[] = [
	{
		id: 1,
		name: 'id',
		label: "Идентификатор",
		sortable: false,
	},
	{
		id: 2,
		name: 'name',
		label: "Имя",
		sortable: true,
	},
	{
		id: 3,
		name: 'email',
		label: "Email",
		sortable: false,
	},
	{
		id: 4,
		name: 'balance',
		label: "Баланс",
		sortable: true,
	},
	{
		id: 5,
		name: 'groupId',
		label: "Идентификатор группы", 
		sortable: true,
	},
	{
		id: 6,
		name: 'createdAt',
		label: "Дата и время создания",
		sortable: true,
	},
	{
		id: 7,
		name: 'actions',
		label: "Действия",
		sortable: false,
	},
]

export const GRPUPS_COLUMNS: Column[] = [
	{
		id: 0,
		name: 'id',
		label: 'Идентификатор',
		sortable: false,
	},
	{
		id: 1,
		name: 'name',
		label: 'Название группы',
		sortable: false,
	},
	{
		id: 2,
		name: 'comment',
		label: 'Комментарий',
		sortable: false,
	},
	{
		id: 3,
		name: 'createdAt',
		label: 'Дата и время создания',
		sortable: true,
	},
	{
		id: 4,
		name: 'actions',
		label: "Действия",
		sortable: false,
	},
]
