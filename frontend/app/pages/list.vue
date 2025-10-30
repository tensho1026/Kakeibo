<template>
  <div class="min-h-screen bg-slate-100 py-10">
    <div class="mx-auto flex max-w-6xl flex-col gap-8 px-5">
      <header class="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">取引一覧</h1>
          <p class="text-sm text-slate-500">直近の収支を一覧で確認し、カテゴリや期間で絞り込みましょう。</p>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            CSV 出力
          </button>
          <NuxtLink
            to="/add"
            class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            新規入力
          </NuxtLink>
        </div>
      </header>

      <section class="grid gap-4 md:grid-cols-3">
        <div
          v-for="summary in summaryCards"
          :key="summary.title"
          class="rounded-2xl bg-white p-5 shadow-sm"
        >
          <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span>{{ summary.title }}</span>
            <span>{{ summary.icon }}</span>
          </div>
          <p class="mt-3 text-2xl font-bold text-slate-900">{{ summary.value }}</p>
          <p class="mt-1 text-xs text-slate-500">{{ summary.caption }}</p>
        </div>
      </section>

      <section class="rounded-2xl bg-white p-6 shadow-sm">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">絞り込み</h2>
            <p class="text-xs text-slate-500">カテゴリや取引タイプでフィルタリングできます。</p>
          </div>
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div class="flex gap-2 rounded-xl bg-slate-100 p-1">
              <button
                v-for="option in typeFilters"
                :key="option.value"
                type="button"
                class="rounded-lg px-3 py-1.5 text-xs font-semibold transition"
                :class="filterState.type === option.value ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-indigo-600'"
                @click="filterState.type = option.value"
              >
                {{ option.label }}
              </button>
            </div>
            <label class="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm">
              月
              <input
                v-model="filterState.month"
                type="month"
                class="border-0 bg-transparent p-0 text-sm text-slate-700 focus:outline-none"
              />
            </label>
            <label class="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm">
              カテゴリ
              <select
                v-model="filterState.category"
                class="border-0 bg-transparent p-0 text-sm text-slate-700 focus:outline-none"
              >
                <option value="すべて">すべて</option>
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section class="rounded-2xl bg-white shadow-sm">
        <div class="flex flex-col gap-4 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">取引履歴</h2>
            <p class="text-xs text-slate-500">該当する取引 {{ filteredTransactions.length }} 件を表示中。</p>
          </div>
          <div class="flex items-center gap-3 text-xs text-slate-400">
            <button type="button" class="flex items-center gap-1 text-indigo-600 hover:text-indigo-500">
              並び替え
              <span class="text-xs">▼</span>
            </button>
            <span>・</span>
            <button type="button" class="hover:text-indigo-600">列をカスタマイズ</button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-100">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th class="px-6 py-3 text-left font-semibold">日付</th>
                <th class="px-6 py-3 text-left font-semibold">内容</th>
                <th class="px-6 py-3 text-left font-semibold">カテゴリ</th>
                <th class="px-6 py-3 text-left font-semibold">支払い方法</th>
                <th class="px-6 py-3 text-right font-semibold">金額</th>
                <th class="px-6 py-3 text-right font-semibold">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
              <tr
                v-for="transaction in filteredTransactions"
                :key="transaction.id"
                class="transition hover:bg-slate-50"
              >
                <td class="whitespace-nowrap px-6 py-4 text-xs text-slate-500">{{ transaction.date }}</td>
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="font-semibold text-slate-900">{{ transaction.title }}</span>
                    <span class="text-xs text-slate-500">{{ transaction.note }}</span>
                  </div>
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <span
                    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                    :class="transaction.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'"
                  >
                    <span>{{ transaction.icon }}</span>
                    {{ transaction.category }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-xs text-slate-500">{{ transaction.method }}</td>
                <td
                  class="whitespace-nowrap px-6 py-4 text-right font-semibold"
                  :class="transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'"
                >
                  {{ transaction.amount }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-right text-xs font-medium">
                  <button type="button" class="text-indigo-600 hover:text-indigo-500">編集</button>
                  <span class="mx-2 text-slate-200">|</span>
                  <button type="button" class="text-rose-500 hover:text-rose-400">削除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex flex-col items-center justify-between gap-4 border-t border-slate-100 px-6 py-4 text-xs text-slate-500 md:flex-row">
          <span>1 - {{ filteredTransactions.length }} 件表示 / 全 {{ transactions.length }} 件</span>
          <div class="flex items-center gap-2">
            <button type="button" class="rounded-lg border border-slate-200 px-3 py-1 font-semibold hover:bg-slate-50">前へ</button>
            <button type="button" class="rounded-lg border border-slate-200 px-3 py-1 font-semibold hover:bg-slate-50">次へ</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const transactions = [
  {
    id: 1,
    date: '2024-06-14',
    title: 'スーパーでの買い物',
    note: '週末のまとめ買い',
    category: '食費',
    method: 'クレジットカード',
    amount: '-¥6,540',
    type: 'expense',
    icon: '🛒',
  },
  {
    id: 2,
    date: '2024-06-12',
    title: '給与振込（6月）',
    note: '基本給 + 残業代',
    category: '給与',
    method: '銀行振込',
    amount: '+¥320,000',
    type: 'income',
    icon: '💼',
  },
  {
    id: 3,
    date: '2024-06-11',
    title: 'オンライン英会話',
    note: '月額サブスクリプション',
    category: '教育',
    method: 'クレジットカード',
    amount: '-¥6,980',
    type: 'expense',
    icon: '🧠',
  },
  {
    id: 4,
    date: '2024-06-10',
    title: '電気料金（6月分）',
    note: '自動引き落とし',
    category: '光熱費',
    method: '口座振替',
    amount: '-¥8,420',
    type: 'expense',
    icon: '💡',
  },
  {
    id: 5,
    date: '2024-06-08',
    title: 'フリーランス案件',
    note: 'Web デザイン制作費',
    category: '副業',
    method: '銀行振込',
    amount: '+¥48,000',
    type: 'income',
    icon: '🎨',
  },
  {
    id: 6,
    date: '2024-06-07',
    title: '映画館',
    note: '友人と映画鑑賞',
    category: '娯楽',
    method: '現金',
    amount: '-¥2,200',
    type: 'expense',
    icon: '🎬',
  },
] as const

const categories = ['食費', '光熱費', '住居費', '交通費', '日用品', '娯楽', '教育', '給与', '副業'] as const

const filterState = reactive({
  type: 'all',
  month: '2024-06',
  category: 'すべて',
})

const typeFilters = [
  { value: 'all', label: 'すべて' },
  { value: 'income', label: '収入' },
  { value: 'expense', label: '支出' },
] as const

const filteredTransactions = computed(() =>
  transactions.filter((transaction) => {
    const monthMatches = filterState.month === '' || transaction.date.startsWith(filterState.month)
    const typeMatches = filterState.type === 'all' || transaction.type === filterState.type
    const categoryMatches = filterState.category === 'すべて' || transaction.category === filterState.category
    return monthMatches && typeMatches && categoryMatches
  }),
)

const summaryCards = computed(() => {
  const totalIncome = transactions
    .filter((item) => item.type === 'income')
    .reduce((acc, current) => acc + Number(current.amount.replace(/[^\d-]/g, '')), 0)
  const totalExpense = transactions
    .filter((item) => item.type === 'expense')
    .reduce((acc, current) => acc + Number(current.amount.replace(/[^\d-]/g, '')), 0)
  const balance = totalIncome + totalExpense

  return [
    {
      title: '今月の収入',
      value: `¥${totalIncome.toLocaleString()}`,
      caption: '前年同月比 +5%',
      icon: '💹',
    },
    {
      title: '今月の支出',
      value: `¥${Math.abs(totalExpense).toLocaleString()}`,
      caption: '予算まで残り ¥72,000',
      icon: '🧾',
    },
    {
      title: '今月の残高',
      value: `¥${balance.toLocaleString()}`,
      caption: '貯蓄目標まで 38%',
      icon: '📊',
    },
  ] as const
})
</script>
