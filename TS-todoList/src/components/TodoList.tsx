import { useTodos } from '../context/TodoContext'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const { filteredTodos } = useTodos()

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        TODO一覧 ({filteredTodos.length}件)
      </h2>
      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          TODOがありません。新しいTODOを追加してください。
        </div>
      ) : (
        <div>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  )
}

