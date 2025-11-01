<script setup lang="ts">
const form = reactive({ email: "", password: "" });
const router = useRouter();
const handleSubmit = async () => {
  const res = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  });
  if (res) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    console.log(data.token, "トークンですよーーーー");

    router.push("/");
  }
};
</script>
<template>
  <div class="min-h-screen bg-slate-100">
    <div
      class="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-12"
    >
      <div
        class="w-full max-w-md rounded-3xl bg-white px-8 py-10 shadow-lg shadow-indigo-100"
      >
        <header class="space-y-2">
          <NuxtLink
            to="/"
            class="text-xs font-semibold uppercase tracking-wide text-indigo-500 hover:text-indigo-600"
          >
            家計簿アプリ
          </NuxtLink>
          <h1 class="text-2xl font-bold text-slate-900">ログイン</h1>
          <p class="text-sm text-slate-500">
            メールアドレスとパスワードを入力して、ダッシュボードにアクセスしましょう。
          </p>
        </header>

        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
            メールアドレス
            <input
              type="email"
              placeholder="taro@example.com"
              class="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              required
              v-model="form.email"
            />
          </label>

          <label class="flex flex-col gap-2 text-sm font-medium text-slate-700">
            パスワード
            <input
              type="password"
              placeholder="パスワード"
              class="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              required
              v-model="form.password"
            />
          </label>

          <div class="flex items-center justify-between text-xs text-slate-500">
            <label class="inline-flex items-center gap-2">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400"
              />
              ログイン情報を記憶する
            </label>
            <button
              type="button"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              パスワードをお忘れですか？
            </button>
          </div>

          <button
            type="submit"
            class="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            ログイン
          </button>
        </form>

        <div class="mt-6 flex flex-col gap-3 text-xs text-slate-500">
          <div class="flex items-center gap-3">
            <span class="h-px flex-1 bg-slate-200" />
            <span>または</span>
            <span class="h-px flex-1 bg-slate-200" />
          </div>
          <button
            type="button"
            class="flex items-center justify-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <span class="text-lg">🔐</span>
            シングルサインオンでログイン
          </button>
        </div>

        <p class="mt-6 text-xs text-slate-500">
          初めての方ですか？
          <NuxtLink
            to="/register"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
            >アカウントを作成</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
