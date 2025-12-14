import { useState } from 'react'
import type { Todo, TodoStatus } from '../types/todo'
import { useTodos } from '../context/TodoContext'

const STATUS_LABEL: Record<TodoStatus, string> = {
  todo: '未着手',
  doing: '進行中',
  done: '完了',
}

const STATUS_COLORS: Record<TodoStatus, string> = {
  todo: 'bg-gray-100 text-gray-800 border-gray-300',
  doing: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  done: 'bg-green-100 text-green-800 border-green-300',
}

interface TodoItemProps {
  todo: Todo
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { updateTodo, deleteTodo } = useTodos()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDetail, setEditDetail] = useState(todo.detail)
  const [editDeadline, setEditDeadline] = useState(todo.deadline || '')
  const [editStatus, setEditStatus] = useState<TodoStatus>(todo.status)

  const handleSave = () => {
    updateTodo(todo.id, {
      title: editTitle.trim(),
      detail: editDetail.trim(),
      deadline: editDeadline || undefined,
      status: editStatus,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDetail(todo.detail)
    setEditDeadline(todo.deadline || '')
    setEditStatus(todo.status)
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus: TodoStatus) => {
    updateTodo(todo.id, { status: newStatus })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div
      className={`border rounded-lg p-4 mb-4 transition-all ${
        STATUS_COLORS[todo.status]
      } ${isEditing ? 'ring-2 ring-blue-500' : ''}`}
    >
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">タイトル</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">詳細</label>
            <textarea
              value={editDetail}
              onChange={(e) => setEditDetail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">期限</label>
            <input
              type="date"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ステータス</label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as TodoStatus)}
              className="w-full px-3 py-2 border border-gray-400 rounded bg-white text-gray-900"
            >
              <option value="todo">未着手</option>
              <option value="doing">進行中</option>
              <option value="done">完了</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              保存
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">{todo.title}</h3>
              <div className="text-sm opacity-75 mb-2">ID: {todo.id}</div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${STATUS_COLORS[todo.status]}`}
            >
              {STATUS_LABEL[todo.status]}
            </span>
          </div>
          {todo.detail && <p className="mb-2 whitespace-pre-wrap">{todo.detail}</p>}
          {todo.deadline && (
            <div className="text-sm mb-2">
              <strong>期限:</strong> {new Date(todo.deadline).toLocaleDateString('ja-JP')}
            </div>
          )}
          <div className="text-xs opacity-60 mb-3">
            作成: {formatDate(todo.createdAt)} | 更新: {formatDate(todo.updatedAt)}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              編集
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              削除
            </button>
            <div className="flex gap-1">
              <button
                onClick={() => handleStatusChange('todo')}
                disabled={todo.status === 'todo'}
                className={`px-3 py-1 rounded text-sm ${
                  todo.status === 'todo'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-500 hover:bg-gray-600'
                } text-white`}
              >
                未着手
              </button>
              <button
                onClick={() => handleStatusChange('doing')}
                disabled={todo.status === 'doing'}
                className={`px-3 py-1 rounded text-sm ${
                  todo.status === 'doing'
                    ? 'bg-yellow-400 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                } text-white`}
              >
                進行中
              </button>
              <button
                onClick={() => handleStatusChange('done')}
                disabled={todo.status === 'done'}
                className={`px-3 py-1 rounded text-sm ${
                  todo.status === 'done'
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                完了
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

