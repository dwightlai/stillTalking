# Still Talking — 项目长期记忆

## 部署流程
- 仓库：`git@github.com:dwightlai/stillTalking.git`（SSH，已配置 `~/.ssh/id_ed25519`）
- HTTPS push 无写权限，必须走 SSH
- 生产部署：`npx vercel --prod --yes`（Vercel CLI 已登录账号 `laidehua771104-3286`，别名 `stilltalkingfamily.com`）
- 改远程为 SSH 一次：`git remote set-url origin git@github.com:dwightlai/stillTalking.git`
- 无 GitHub Actions / Vercel 自动部署：每次手动 `npx vercel --prod` 触发（虽然 Vercel 项目可能挂在 GitHub 上做 auto-deploy，但本地主动 prod 部署更稳）

## 内容工程关键约束
- frontmatter 强校验：16 字段缺一不可（`scripts/check-content.mjs`）
- 词数下限 600，文章实际 780-1120
- 复合场景必须标 `exampleType: "composite"` + evidence note 中显式说明
- AI 插图必须在文章里写 `AI-generated editorial illustration for Still Talking.`（模板已固化）
- 真实数据要可追溯到 Pew / Census / 学术期刊；不能编造百分比
- featured 标志一次只能挂一篇文章

## 图片处理
- ImageGen 输出 PNG，右下角带"图片由AI生成"水印
- 处理流：PIL 加载 → 计算右下角 22-28%×10-16% 区域 → 镜像采样左侧 → 高斯模糊（radius 12）→ 粘贴 → 最后裁掉含水印的右下角 → 转 webp quality 88
- 输出文件已统一 webp，文件名格式：`article-<slug>.webp`

## 已有文章主题地图（按 category）
- Boundaries: `concern-becomes-control`, `holiday-homecoming-without-the-interrogation`（new）, `privacy-is-not-distance`, `repeated-reminders`
- Love & Partnership: `couple-first-rule-for-in-laws`, `talk-about-marriage-without-pressure`, `when-you-want-grandchildren-and-your-child-does-not`（new）
- Communication: `apology-that-does-not-demand-forgiveness`, `how-often-should-adult-children-call`, `let-the-good-news-land`, `when-you-lose-your-temper-with-your-adult-child`
- Career & Education: `career-advice-adult-child-can-use`
- Money & Support: `financial-help-control`
- Family Repair: `when-adult-child-moves-out`

## Newsletter 邮件集成
- 服务方：Resend（`api.resend.com/emails`）—— 2026-07-10 从 Kit 迁移
- API key 权限：仅发邮件（restricted key，不能管 Contacts/Audience）
- 前端：`src/components/newsletter-form.tsx` → POST `/api/subscribe`
- 后端：`src/app/api/subscribe/route.ts` —— Resend 发 welcome 邮件 + 通知主人
- 退订：`/unsubscribe` 页面 + `/api/unsubscribe` route
- Vercel 环境变量：`RESEND_API_KEY`、`NEWSLETTER_NOTIFY_TO`（laidehua771104@gmail.com）
- 旧 Kit 变量 `KIT_API_KEY`、`KIT_FORM_ID` 可清理
- 待办：验证 `stilltalkingfamily.com` 域名后改 `RESEND_FROM_EMAIL`；如需自动管理列表加 Vercel KV
