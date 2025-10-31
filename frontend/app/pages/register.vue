<template>
  <div class="min-h-screen bg-slate-100">
    <div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col lg:flex-row">
      <section class="flex w-full flex-1 flex-col justify-between bg-indigo-600 px-8 py-10 text-white lg:rounded-r-3xl">
        <header>
          <NuxtLink to="/" class="text-sm font-semibold tracking-wide text-indigo-100 hover:text-white">
            ← ダッシュボードへ戻る
          </NuxtLink>
          <h1 class="mt-6 text-3xl font-bold leading-tight md:text-4xl">家計をもっと<br />スマートに管理</h1>
          <p class="mt-4 text-sm text-indigo-100">
            収支を記録して、予算や貯蓄目標の達成状況を簡単に把握できます。登録は無料です。
          </p>
        </header>
        <ul class="space-y-4 text-sm text-indigo-50">
          <li class="flex items-start gap-3">
            <span class="mt-1 text-lg">📊</span>
            可視化されたダッシュボードでカンタン分析
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-1 text-lg">🔔</span>
            支出の偏りを通知でお知らせ
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-1 text-lg">🤝</span>
            家族と共有して共同管理も可能
          </li>
        </ul>
        <p class="text-xs text-indigo-100/80">
          登録することで利用規約とプライバシーポリシーに同意したものとみなします。
        </p>
      </section>

      <section class="flex w-full flex-1 items-center justify-center bg-white px-8 py-10 lg:rounded-l-3xl">
        <div class="w-full max-w-md">
          <h2 class="text-2xl font-bold text-slate-900">新規登録</h2>
          <p class="mt-2 text-sm text-slate-500">必要事項を入力して家計簿アプリをはじめましょう。</p>

          <form class="mt-8 space-y-6" @submit.prevent>
            <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
              名前
              <input
                type="text"
                placeholder="山田 太郎"
                class="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>

            <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
              メールアドレス
              <input
                type="email"
                placeholder="taro@example.com"
                class="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>

            <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
              パスワード
              <input
                type="password"
                placeholder="8文字以上のパスワード"
                class="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>

            <button
              type="submit"
              class="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              登録する
            </button>
          </form>

          <p class="mt-6 text-xs text-slate-500">
            すでにアカウントをお持ちですか？
            <NuxtLink to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500">ログインはこちら</NuxtLink>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
