import { TodoProvider } from './context/TodoContext'
import { TodoForm } from './components/TodoForm'
import { FilterBar } from './components/FilterBar'
import { TodoList } from './components/TodoList'

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            TODO リスト
          </h1>
          <TodoForm />
          <FilterBar />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
