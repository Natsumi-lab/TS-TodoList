export type TodoStatus = 'todo' | 'doing' | 'done'

export interface Todo {
  id: string
  title: string
  status: TodoStatus
  detail: string
  deadline?: string // YYYY-MM-DD形式
  createdAt: string // ISO 8601形式
  updatedAt: string // ISO 8601形式
}

export interface FilterOptions {
  id?: string
  status?: TodoStatus
  deadline?: string
}

export type SortKey = 'id' | 'deadline' | 'none'
export type SortOrder = 'asc' | 'desc'

