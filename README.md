# 橋積電 CSMC — 官方網站

> 引領晶圓技術的創新未來

## 🚀 快速部署到 GitHub Pages

### 步驟一：建立 Repository

1. 登入 GitHub，點右上角 **「+」** → **New repository**
2. Repository name 填入：`csmc-website`（或任何你喜歡的名稱）
3. 設為 **Public**
4. 點「Create repository」

### 步驟二：上傳專案檔案

**方法 A — 網頁拖拉（最簡單）**
1. 進入剛建的 repository
2. 點「uploading an existing file」連結
3. 將整個 `csmc-website` 資料夾內的**所有檔案與資料夾**拖入上傳區
4. 捲到底，點「Commit changes」

**方法 B — Git 指令**
```bash
cd csmc-website
git init
git add .
git commit -m "Initial commit: 橋積電官網"
git branch -M main
git remote add origin https://github.com/你的帳號/csmc-website.git
git push -u origin main
```

### 步驟三：啟用 GitHub Pages

1. 進入 repository → 上方選單點「**Settings**」
2. 左側選「**Pages**」
3. Source 選「**Deploy from a branch**」
4. Branch 選「**main**」、資料夾選「**/ (root)**」
5. 點「**Save**」

### 步驟四：等待部署完成

約 1–3 分鐘後，網站會發布在：
```
https://你的帳號.github.io/csmc-website/
```

---

## 📁 專案結構

```
csmc-website/
├── index.html       ← 首頁
├── about.html       ← 關於我們
├── services.html    ← 服務項目（含購物車功能）
├── resources.html   ← 資源中心
├── contact.html     ← 聯絡我們
├── careers.html     ← 人才招募（應徵頁面）
├── css/
│   └── style.css    ← 全站樣式
├── js/
│   ├── components.js ← 共用導覽列 / 頁尾 / 購物車 UI
│   └── main.js      ← 互動邏輯（購物車、表單、動畫）
└── README.md        ← 本說明文件
```

## 🛠 功能說明

| 功能 | 說明 |
|------|------|
| 響應式設計 | 支援桌機、平板、手機 |
| 購物車 | 可加入服務項目，localStorage 保存 |
| 聯絡表單 | 前端驗證＋送出確認提示 |
| 滾動動畫 | 卡片進場 fade-in 效果 |
| 深色主題 | 全站一致深色風格 |

## ✏️ 自訂修改

### 更換聯絡資訊
編輯 `contact.html` 與 `services.html` 中的地址、電話、Email

### 更換 Google Maps
1. 前往 [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)
2. 取得你地址的 embed URL
3. 替換 `<iframe src="...">` 的連結

### 更換服務名稱與價格
編輯 `services.html` 中的 `.product-name`、`.product-price` 的 `data-price` 屬性

### 調整配色
編輯 `css/style.css` 最上方的 CSS 變數：
```css
:root {
  --accent: #c0392b; /* 主色（紅色） */
  --gold:   #d4a843; /* 價格數字（金色） */
  /* ... */
}
```

## 📝 注意事項

- 購物車目前為前端示意功能，**不會真正結帳**
- 聯絡表單為靜態展示，如需真正收信請串接 [Formspree](https://formspree.io) 或 [EmailJS](https://www.emailjs.com)
- Google Maps embed 需要穩定網路連線才能正常顯示

---

©2026 橋積電股份有限公司
