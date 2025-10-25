# Node公式の軽量イメージを使用
FROM node:18-alpine

# 作業ディレクトリ
WORKDIR /app

# package.jsonとlockファイルのみコピーして依存関係インストール
COPY package*.json ./
RUN npm install

# 残りのソースコードをコピー
COPY . .

# Nestをビルド（TypeScript → JavaScript）
RUN npm run build

# アプリを起動
CMD ["npm", "run", "start:prod"]

# NestJSはデフォルトで3000ポートを使用
EXPOSE 3000
