# 📝 TODO List App

React Hooks と TypeScript を使って作成した TODO リストアプリです。  
状態管理・型設計・UI構築を一通り体験することを目的に開発しました。

Vite（ヴィート）を利用して高速な開発環境を構築しています。

---

## 📌 主な特徴

- React Hooks を使用した関数コンポーネント構成
- TypeScript による厳密な型付け（`any` 不使用）
- TODO の追加・削除・編集・絞り込みに対応
- Tailwind CSS によるシンプルで見やすい UI
- Context API を使った状態管理

---

## 🛠 使用技術

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Context API**

---

## 🗂 TODO データ構造

各 TODO には以下の情報を持たせています。

- ID（UUID）
- タイトル
- ステータス  
  - 未着手  
  - 進行中  
  - 完了
- 詳細内容
- 期限
- 作成日
- 更新日

---

##  実装済み機能

### 基本機能
- TODO の追加
- TODO の削除
- TODO の編集
- TODO 一覧表示

### 絞り込み機能
- ID で絞り込み
- ステータスで絞り込み
- 期限で絞り込み

---

##  UI / UX の工夫

- ステータスごとに色を変更し、進捗が一目で分かるように設計
- Tailwind CSS によるレスポンシブ対応

---

##  開発環境の起動方法  
```
npm install
npm run dev
```
ブラウザで以下にアクセスします：
```
http://localhost:5173/
```

## 📚学習目的・工夫点
- React Hooks の基本的な使い方を理解する
- TypeScript で「型を先に設計する」意識を身につける
- state を直接操作せず、更新関数を通す設計
- 見た目とロジックを分離したコンポーネント設計