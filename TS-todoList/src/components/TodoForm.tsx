import { useState } from 'react'
import type { FormEvent } from 'react'
import { useTodos } from '../context/TodoContext'

export const TodoForm = () => {
  const { addTodo } = useTodos()
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [deadline, setDeadline] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title.trim()) {
      addTodo(title.trim(), detail.trim(), deadline || undefined)
      setTitle('')
      setDetail('')
      setDeadline('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">新しいTODOを追加</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="TODOのタイトルを入力"
            required
          />
        </div>
        <div>
          <label htmlFor="detail" className="block text-sm font-medium text-gray-700 mb-1">
            詳細
          </label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="TODOの詳細を入力"
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
            期限
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
        >
          追加
        </button>
      </div>
    </form>
  )
}

