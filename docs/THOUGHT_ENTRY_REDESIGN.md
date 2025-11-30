# ThoughtEntryページ 再デザイン設計書

## 目的

LocalSuccess UIガイドライン v0.1 に基づき、「想いを言葉にする」画面を再デザインし、プロダクト全体の統一感を高め、思考フローの可視化と操作性を向上させる。

## 設計意図

### 1. LSPageLayout構造への準拠

**変更前**: 中央揃えのシンプルなレイアウト  
**変更後**: LSPageLayout構造（Header → Section → CTA）に統一

```
<Page>
  <Header title="想いを言葉にする" />
  <Section title="入力">
    <LSCard>
      <ThoughtInput />
    </LSCard>
  </Section>
  <Section title="生成された仮説">
    <HypothesisCard />
  </Section>
  <FooterCTA />
</Page>
```

**理由**: 
- ページ間で一貫した構造を提供
- ユーザーが画面構造を予測しやすくなる
- 情報の階層が明確になる

### 2. カラートークンの統一

**変更前**: `slate-*` 系のカラーを直接使用  
**変更後**: `ls-*` カラートークンを使用

- `bg-slate-50` → `bg-ls-bg`
- `text-slate-900` → `text-ls-text`
- `text-slate-500` → `text-ls-text-light`
- `border-slate-200` → `border-ls-border`
- `bg-slate-800` → `bg-ls-primary`

**理由**:
- プロダクト全体で統一されたカラーパレット
- 自然・地域を想起する落ち着いた配色
- メンテナンス性の向上

### 3. タイポグラフィ階層の統一

**変更前**: 
- タイトル: `text-xl sm:text-2xl font-medium`

**変更後**:
- ページタイトル: `text-2xl font-semibold`（ガイドライン準拠）
- セクションタイトル: `text-lg font-medium`
- 本文: `text-sm`
- 補足: `text-xs text-ls-text-light`

**理由**:
- ガイドラインで定義された階層に統一
- 視認性の向上
- ページ間での一貫性

### 4. 余白・角丸・シャドウの統一

**変更前**: バラバラな余白設定  
**変更後**: ガイドラインに準拠

- ページ左右: `px-4`
- セクション間: `mt-6`
- カード内: `p-4`
- 角丸: `rounded-lg`
- シャドウ: `shadow-sm`

**理由**:
- 視覚的なリズムの統一
- 情報密度の適正化
- プロダクト全体の統一感

### 5. コンポーネント構造の統一

#### LSCard構造

**変更前**: カードの構造がバラバラ  
**変更後**: 統一された構造

```jsx
<Card className="border-ls-border shadow-sm">
  <CardContent className="p-4">
    {/* タイトル・本文・CTAの順序 */}
  </CardContent>
</Card>
```

#### LSListItem構造（HypothesisCard内）

**変更前**: アイコンサイズが `w-4 h-4`  
**変更後**: アイコンサイズを `w-5 h-5`（20px）に統一

```jsx
<div className="flex items-start gap-2">
  <Users className="w-5 h-5 text-ls-text-light mt-0.5 shrink-0" />
  <div>
    <p className="text-xs font-medium text-ls-text-light mb-1">ラベル</p>
    <p className="text-sm text-ls-text leading-relaxed">本文</p>
  </div>
</div>
```

**理由**:
- コンポーネントの再利用性向上
- 視覚的な一貫性
- メンテナンス性の向上

### 6. ボタンの統一

**変更前**: 
- Primary: `bg-slate-800 hover:bg-slate-900`

**変更後**:
- Primary: `bg-ls-primary hover:bg-ls-primary-light`
- Secondary: `variant="outline"` + `border-ls-border`

**理由**:
- ガイドラインで定義されたボタンスタイルに統一
- プロダクト全体での一貫性

### 7. 情報密度の適正化

**変更前**: 
- 中央揃えで情報が散らばっている
- セクション間の余白が不統一

**変更後**:
- 左揃えで情報を整理
- セクション間は `mt-6` で統一
- カード内は `p-4` で統一

**理由**:
- 読みやすさの向上
- 思考の流れが明確になる
- 判断疲れの軽減

## 改善後のUIレイアウト

### Step 1: 入力画面

```
┌─────────────────────────────────┐
│ [🌱] LocalSuccess OS            │
├─────────────────────────────────┤
│                                 │
│  [💡] 想いを言葉にする          │
│       最近感じている違和感や...  │
│                                 │
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │  テキスト入力エリア        │ │
│  │                           │ │
│  │                    [送信] │ │
│  └───────────────────────────┘ │
│  Cmd + Enter で送信            │
│                                 │
└─────────────────────────────────┘
```

### Step 2: ローディング画面

```
┌─────────────────────────────────┐
│ [🌱] LocalSuccess OS            │
├─────────────────────────────────┤
│                                 │
│  [💡] 想いを言葉にする          │
│       AIが複数の視点から...     │
│                                 │
│  ┌───────────────────────────┐ │
│  │                           │ │
│  │        [🔄]               │ │
│  │   AIが複数の視点から...   │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### Step 3: 仮説選択画面

```
┌─────────────────────────────────┐
│ [🌱] LocalSuccess OS            │
├─────────────────────────────────┤
│                                 │
│  [💡] 想いを言葉にする          │
│       あなたの想いから...       │
│                                 │
│  あなたの入力                    │
│  ┌───────────────────────────┐ │
│  │  入力したテキスト...      │ │
│  └───────────────────────────┘ │
│                                 │
│  生成された仮説                  │
│  ┌───────────────────────────┐ │
│  │ 仮説タイトル          [✓] │ │
│  │ 👥 ターゲット: ...        │ │
│  │ 📍 背景: ...              │ │
│  │ 👁 検証の切り口: ...      │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ 仮説タイトル               │ │
│  │ ...                       │ │
│  └───────────────────────────┘ │
│                                 │
│  [入力し直す] [この仮説を深掘り]│
│                                 │
└─────────────────────────────────┘
```

## 必要なコンポーネント一覧

### 既存コンポーネント（更新）

1. **ThoughtEntry.jsx** - メインページコンポーネント
   - LSPageLayout構造に準拠
   - カラートークン使用
   - タイポグラフィ階層統一

2. **ThoughtInput.jsx** - 入力コンポーネント
   - LSCard構造に準拠
   - カラートークン使用
   - ボタンスタイル統一

3. **HypothesisCard.jsx** - 仮説カードコンポーネント
   - LSCard構造に準拠
   - アイコンサイズ統一（20px）
   - カラートークン使用

### 新規コンポーネント（将来的に作成）

1. **LSPageLayout.jsx** - ページレイアウトコンポーネント
   - Header, Section, FooterCTA の構造を提供

2. **LSSection.jsx** - セクションコンポーネント
   - タイトル + コンテンツの構造

3. **LSCard.jsx** - カードコンポーネント
   - 統一されたカードスタイル

4. **LSListItem.jsx** - リストアイテムコンポーネント
   - 統一されたリストアイテムスタイル

## コード例

### ThoughtEntry.jsx（主要部分）

```jsx
<div className="min-h-screen bg-ls-bg">
  {/* Header */}
  <div className="px-4 pt-6 pb-4">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-ls-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-ls-text">
            想いを言葉にする
          </h1>
        </div>
      </div>
      <p className="text-sm text-ls-text-light ml-[52px]">
        {description}
      </p>
    </div>
  </div>

  {/* Main Content */}
  <div className="px-4 pb-6">
    <div className="max-w-3xl mx-auto">
      {/* LSSection */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-ls-text mb-3">
          セクションタイトル
        </h2>
        <Card className="border-ls-border shadow-sm">
          <CardContent className="p-4">
            {/* コンテンツ */}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</div>
```

## 改善効果

### 1. 統一感の向上
- カラートークンによる一貫した配色
- タイポグラフィ階層の統一
- 余白・角丸・シャドウの統一

### 2. 操作性の向上
- 明確な情報階層
- 適切な情報密度
- モバイルファーストな設計

### 3. メンテナンス性の向上
- カラートークンの一元管理
- コンポーネント構造の統一
- ガイドライン準拠による予測可能性

### 4. 思考フローの可視化
- LSPageLayout構造による明確な流れ
- セクション分けによる情報整理
- 視覚的なリズムの統一

## 今後の拡張

1. **LSPageLayoutコンポーネント化**
   - 再利用可能なページレイアウトコンポーネントを作成

2. **LSSectionコンポーネント化**
   - セクション構造をコンポーネント化

3. **LSCardコンポーネント化**
   - 統一されたカードスタイルをコンポーネント化

4. **レスポンシブ最適化**
   - モバイル・タブレット・デスクトップでの最適化

5. **アニメーション追加**
   - 画面遷移時のスムーズなアニメーション

---

**バージョン**: v0.1  
**最終更新**: 2025年  
**準拠**: LocalSuccess UIガイドライン v0.1

