import type { TodoStatus } from '../types/todo'
import { useTodos } from '../context/TodoContext'

export const FilterBar = () => {
  const { filterOptions, sortKey, sortOrder, setFilterOptions, setSortKey, setSortOrder } =
    useTodos()

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">絞り込み・ソート</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IDで絞り込み</label>
            <input
              type="text"
              value={filterOptions.id || ''}
              onChange={(e) =>
                setFilterOptions({ ...filterOptions, id: e.target.value || undefined })
              }
              placeholder="IDを入力"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ステータスで絞り込み
            </label>
            <select
              value={filterOptions.status || ''}
              onChange={(e) =>
                setFilterOptions({
                  ...filterOptions,
                  status: (e.target.value as TodoStatus) || undefined,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">すべて</option>
              <option value="todo">未着手</option>
              <option value="doing">進行中</option>
              <option value="done">完了</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              期限で絞り込み
            </label>
            <input
              type="date"
              value={filterOptions.deadline || ''}
              onChange={(e) =>
                setFilterOptions({ ...filterOptions, deadline: e.target.value || undefined })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ソート</label>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as 'id' | 'deadline' | 'none')}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">ソートなし</option>
              <option value="id">ID</option>
              <option value="deadline">期限</option>
            </select>
          </div>
          {sortKey !== 'none' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">順序</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">昇順</option>
                <option value="desc">降順</option>
              </select>
            </div>
          )}
          <button
            onClick={() => {
              setFilterOptions({})
              setSortKey('none')
              setSortOrder('asc')
            }}
            className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            リセット
          </button>
        </div>
      </div>
    </div>
  )
}

