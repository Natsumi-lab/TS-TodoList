import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Todo, FilterOptions, SortKey, SortOrder } from '../types/todo'
import { v4 as uuidv4 } from 'uuid'

interface TodoContextType {
  todos: Todo[]
  filteredTodos: Todo[]
  filterOptions: FilterOptions
  sortKey: SortKey
  sortOrder: SortOrder
  addTodo: (title: string, detail: string, deadline?: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void
  setFilterOptions: (options: FilterOptions) => void
  setSortKey: (key: SortKey) => void
  setSortOrder: (order: SortOrder) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({})
  const [sortKey, setSortKey] = useState<SortKey>('none')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const addTodo = useCallback((title: string, detail: string, deadline?: string) => {
    const now = new Date().toISOString()
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      status: 'todo',
      detail,
      deadline,
      createdAt: now,
      updatedAt: now,
    }
    setTodos((prev) => [...prev, newTodo])
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const updateTodo = useCallback((id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    )
  }, [])

  // 絞り込みとソートの適用
  const filteredTodos = todos
    .filter((todo) => {
      if (filterOptions.id && !todo.id.includes(filterOptions.id)) return false
      if (filterOptions.status && todo.status !== filterOptions.status) return false
      if (filterOptions.deadline && todo.deadline !== filterOptions.deadline) return false
      return true
    })
    .sort((a, b) => {
      if (sortKey === 'none') return 0

      let comparison = 0
      if (sortKey === 'id') {
        comparison = a.id.localeCompare(b.id)
      } else if (sortKey === 'deadline') {
        const aDeadline = a.deadline || ''
        const bDeadline = b.deadline || ''
        comparison = aDeadline.localeCompare(bDeadline)
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        filterOptions,
        sortKey,
        sortOrder,
        addTodo,
        deleteTodo,
        updateTodo,
        setFilterOptions,
        setSortKey,
        setSortOrder,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodos = () => {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}

