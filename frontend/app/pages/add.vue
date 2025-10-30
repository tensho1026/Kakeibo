<template>
  <div class="min-h-screen bg-slate-100 py-10">
    <div class="mx-auto max-w-4xl px-5">
      <header class="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">収支を記録する</h1>
          <p class="text-sm text-slate-500">日付やカテゴリを入力して家計簿に追加しましょう。</p>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            下書きを保存
          </button>
          <button
            type="submit"
            form="transaction-form"
            class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            登録する
          </button>
        </div>
      </header>

      <form id="transaction-form" @submit.prevent class="mt-8 space-y-8">
        <section class="rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">基本情報</h2>
            <p class="mt-1 text-xs text-slate-500">支出か収入かを選択し、日付やカテゴリを入力します。</p>
          </div>
          <div class="mt-6 grid gap-6 md:grid-cols-2">
            <div class="md:col-span-2">
              <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">種類</span>
              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  v-for="option in transactionTypes"
                  :key="option.value"
                  type="button"
                  class="flex h-full flex-col items-start gap-2 rounded-2xl border p-4 text-left transition"
                  :class="form.type === option.value ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'"
                  @click="form.type = option.value"
                >
                  <span class="text-lg">{{ option.icon }}</span>
                  <div>
                    <p class="text-sm font-semibold">{{ option.label }}</p>
                    <p class="text-xs text-slate-500">{{ option.caption }}</p>
                  </div>
                </button>
              </div>
            </div>

            <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
              日付
              <input
                v-model="form.date"
                type="date"
                class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
              カテゴリ
              <select
                v-model="form.category"
                class="w-full appearance-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option disabled value="">カテゴリを選択</option>
                <option
                  v-for="category in availableCategories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
              金額 (円)
              <div class="relative">
                <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-slate-400">¥</span>
                <input
                  v-model="form.amount"
                  type="number"
                  inputmode="decimal"
                  placeholder="0"
                  class="w-full rounded-xl border border-slate-200 px-8 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </label>

            <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
              支払い方法
              <div class="grid gap-2">
                <label
                  v-for="method in paymentMethods"
                  :key="method.value"
                  class="flex items-center justify-between rounded-xl border px-3 py-2 text-sm shadow-sm transition"
                  :class="form.method === method.value ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-lg">{{ method.icon }}</span>
                    <span class="font-medium">{{ method.label }}</span>
                  </div>
                  <input
                    v-model="form.method"
                    type="radio"
                    :value="method.value"
                    class="hidden"
                  />
                </label>
              </div>
            </label>
          </div>
        </section>

        <section class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">詳細情報</h2>
              <p class="mt-1 text-xs text-slate-500">メモやタグを追加して後から見返しやすくしましょう。</p>
            </div>
            <label class="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
              <input
                v-model="form.recurring"
                type="checkbox"
                class="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400"
              />
              定期的な取引
            </label>
          </div>

          <div class="mt-6 grid gap-6 md:grid-cols-2">
            <label class="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-slate-700">
              メモ
              <textarea
                v-model="form.memo"
                rows="3"
                placeholder="支出の内容や気づきをメモしておきましょう。"
                class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <div class="md:col-span-2">
              <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">タグ</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <button
                  v-for="tag in frequentTags"
                  :key="tag"
                  type="button"
                  class="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                  @click="toggleTag(tag)"
                >
                  <span v-if="form.tags.includes(tag)">✓</span>
                  {{ tag }}
                </button>
              </div>
              <div v-if="form.tags.length" class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in form.tags"
                  :key="tag"
                  class="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
                >
                  {{ tag }}
                  <button
                    type="button"
                    class="text-indigo-400 hover:text-indigo-600"
                    @click="toggleTag(tag)"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">レシート / 添付ファイル</h2>
              <p class="mt-1 text-xs text-slate-500">領収書やメモをアップロードできます（任意）。</p>
            </div>
            <span class="text-xs font-medium text-slate-400">対応形式: JPG, PNG, PDF</span>
          </div>
          <div class="mt-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-8 text-center text-sm text-slate-500">
            <p class="font-medium text-slate-600">ドラッグ＆ドロップまたはクリックしてファイルを追加</p>
            <p class="mt-2 text-xs text-slate-400">最大 5 ファイル・合計 10MB まで</p>
            <button
              type="button"
              class="mt-4 inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              ファイルを選択
            </button>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const transactionTypes = [
  {
    value: 'expense',
    label: '支出',
    caption: '日々の支払い、生活費など',
    icon: '💸',
  },
  {
    value: 'income',
    label: '収入',
    caption: '給与や副業、臨時収入など',
    icon: '💰',
  },
] as const

const categoryMap = {
  expense: ['食費', '光熱費', '住居費', '交通費', '日用品', '娯楽', '教育', 'その他'],
  income: ['給与', '賞与', '副業', '投資', 'その他'],
} as const

const paymentMethods = [
  { value: 'cash', label: '現金', icon: '💴' },
  { value: 'card', label: 'カード', icon: '💳' },
  { value: 'bank', label: '口座振替', icon: '🏦' },
] as const

const frequentTags = ['定期支払', 'サブスク', '家族', '仕事', '特別費', '医療費'] as const

const form = reactive({
  type: 'expense',
  date: '',
  category: '',
  amount: '',
  method: 'cash',
  memo: '',
  recurring: false,
  tags: [] as string[],
})

const availableCategories = computed(() => categoryMap[form.type as keyof typeof categoryMap])

const toggleTag = (tag: string) => {
  const index = form.tags.indexOf(tag)
  if (index > -1) {
    form.tags.splice(index, 1)
  } else {
    form.tags.push(tag)
  }
}
</script>
