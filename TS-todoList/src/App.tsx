import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type TodoStatus = 'todo' | 'doing' | 'done'

Type Todo = {
  type: Todo = {
  id: number
  title: string
  status: TodoStatus
  detail: string
}

const STATUS_LABEL: Record,TodoStatus, string> = {
  todo: '未着手',
  doing: '進行中',
  done: '完了',
}

function App() {
  const todos: Todo[] = [
    {
      id: '1',
      status: 'done',
      detail: 'TypeScriptでTodoの形を定義する',
    },
    {
      id: '2',
      title: '一覧表示する',
      status: 'doing',
      detail: 'mapでTodoを表示する',
    },
  ]

  return (
    <div style={{ padding: 16 }}>
      <h1>TODO List</h1>

      <ul style={{ paddingLeft: 18 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <div>
              <strong>{t.title}</strong>（{STATUS_LABEL[t.status]}）
            </div>
            <div style={{ fontSize: 14 }}>{t.detail}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
