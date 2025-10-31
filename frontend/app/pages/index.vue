<template>
  <div class="min-h-screen bg-slate-100 py-10">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-5">
      <header class="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500">今月の家計簿サマリー</p>
          <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">家計簿ダッシュボード</h1>
          <p class="mt-2 text-sm text-slate-500">収支状況と予算の進捗をひと目で確認できます。</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/add"
            class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            収支を記録
          </NuxtLink>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            レポート出力
          </button>
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ログイン
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
          >
            新規登録
          </NuxtLink>
        </div>
      </header>

      <section class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="card in summaryCards"
          :key="card.title"
          class="rounded-2xl bg-white p-5 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-slate-500">{{ card.title }}</span>
            <span class="text-xl">{{ card.icon }}</span>
          </div>
          <p class="mt-3 text-2xl font-bold text-slate-900">{{ card.value }}</p>
          <p class="mt-1 text-xs text-slate-500">{{ card.caption }}</p>
          <span
            class="mt-4 inline-flex items-center gap-1 text-xs font-semibold"
            :class="card.changeColor"
          >
            <span>{{ card.changeLabel }}</span>
            <span>{{ card.change }}</span>
          </span>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <div class="rounded-2xl bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">最近の取引</h2>
              <NuxtLink to="/list" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">一覧を見る</NuxtLink>
            </div>
            <div class="mt-5 divide-y divide-slate-100">
              <div
                v-for="item in recentTransactions"
                :key="item.id"
                class="flex items-center justify-between py-3"
              >
                <div class="flex items-center gap-4">
                  <span
                    class="flex h-10 w-10 items-center justify-center rounded-xl"
                    :class="item.type === 'income' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'"
                  >
                    {{ item.icon }}
                  </span>
                  <div>
                    <p class="text-sm font-semibold text-slate-900">{{ item.title }}</p>
                    <p class="text-xs text-slate-500">{{ item.date }} ・ {{ item.category }}</p>
                  </div>
                </div>
                <span
                  class="text-sm font-semibold"
                  :class="item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'"
                >
                  {{ item.amount }}
                </span>
              </div>
            </div>
          </div>

          <div class="rounded-2xl bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">予算の進捗</h2>
              <button
                type="button"
                class="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                管理する
              </button>
            </div>
            <div class="mt-5 space-y-5">
              <div
                v-for="budget in budgets"
                :key="budget.category"
                class="space-y-2"
              >
                <div class="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>{{ budget.category }}</span>
                  <span>{{ budget.used }} / {{ budget.limit }} 円</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    class="h-full rounded-full bg-indigo-500 transition-all"
                    :style="{ width: `${budget.progress}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="rounded-2xl bg-white p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-slate-900">クイックアクション</h2>
            <div class="mt-4 grid gap-3">
              <button
                v-for="action in quickActions"
                :key="action.label"
                type="button"
                class="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/60 hover:text-indigo-600"
              >
                <div class="flex items-center gap-3">
                  <span class="text-lg">{{ action.icon }}</span>
                  <span>{{ action.label }}</span>
                </div>
                <span class="text-xs font-medium text-slate-400">{{ action.caption }}</span>
              </button>
            </div>
          </div>

          <div class="rounded-2xl bg-indigo-600 p-6 text-white shadow-sm">
            <h3 class="text-lg font-semibold">月次レポート</h3>
            <p class="mt-2 text-sm text-indigo-100">
              先月よりも支出が 8% 減少しています。家計の改善が順調に進んでいます。
            </p>
            <button
              type="button"
              class="mt-4 inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              詳細を確認
            </button>
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const summaryCards = [
  {
    title: '総収入',
    value: '¥420,000',
    caption: '先月 +12,000 円',
    change: '+2.9%',
    changeLabel: '増加',
    changeColor: 'text-emerald-600',
    icon: '💰',
  },
  {
    title: '総支出',
    value: '¥278,000',
    caption: '先月 -8,500 円',
    change: '-3.0%',
    changeLabel: '減少',
    changeColor: 'text-emerald-600',
    icon: '💸',
  },
  {
    title: '今月の残高',
    value: '¥142,000',
    caption: '予算達成率 64%',
    change: '目標まであと 36%',
    changeLabel: '達成状況',
    changeColor: 'text-slate-500',
    icon: '📊',
  },
  {
    title: '貯蓄額',
    value: '¥35,000',
    caption: '貯蓄率 12%',
    change: '+4,000 円',
    changeLabel: '先月比',
    changeColor: 'text-emerald-600',
    icon: '🏦',
  },
] as const

const recentTransactions = [
  {
    id: 1,
    title: 'スーパーでの食料品',
    amount: '-¥6,540',
    date: '6月 14日',
    category: '食費',
    type: 'expense',
    icon: '🛒',
  },
  {
    id: 2,
    title: '給与振込（6月）',
    amount: '+¥320,000',
    date: '6月 12日',
    category: '給与',
    type: 'income',
    icon: '💼',
  },
  {
    id: 3,
    title: 'カフェでのランチ',
    amount: '-¥1,200',
    date: '6月 11日',
    category: '外食',
    type: 'expense',
    icon: '☕️',
  },
  {
    id: 4,
    title: '電気料金（6月分）',
    amount: '-¥8,420',
    date: '6月 10日',
    category: '光熱費',
    type: 'expense',
    icon: '💡',
  },
] as const

const budgets = [
  { category: '食費', used: 34000, limit: 50000, progress: 68 },
  { category: '住宅費', used: 78000, limit: 80000, progress: 98 },
  { category: '交通費', used: 12000, limit: 20000, progress: 60 },
  { category: '娯楽', used: 8500, limit: 15000, progress: 57 },
] as const

const quickActions = [
  { label: '今月の固定費をチェック', caption: '更新 2 件', icon: '📋' },
  { label: '領収書をアップロード', caption: 'ドラッグ & ドロップ', icon: '🧾' },
  { label: '貯蓄ルールを見直す', caption: 'おすすめ設定', icon: '🎯' },
] as const
</script>
