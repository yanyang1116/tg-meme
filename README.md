# TG Meme Bot

一个现代化的 Telegram 机器人，基于 TypeScript 和 Node.js 构建，支持 Vercel 无服务器部署。

## 功能特性

- 🤖 响应 `/help` 命令，显示帮助信息
- 🚀 基于 TypeScript 开发，类型安全
- 📦 使用 Telegraf 框架，现代化的 Telegram Bot 开发
- ☁️ 支持 Vercel 无服务器部署
- 🔧 完整的开发工具链（ESLint、Prettier、TypeScript）

## 技术栈

- **Node.js** - 运行时环境
- **TypeScript** - 类型安全的 JavaScript
- **Telegraf** - 现代化的 Telegram Bot 框架
- **Vercel** - 无服务器部署平台
- **ESLint + Prettier** - 代码质量和格式化

## 快速开始

### 1. 获取 Bot Token

1. 在 Telegram 中找到 [@BotFather](https://t.me/botfather)
2. 发送 `/newbot` 创建新机器人
3. 按照提示设置机器人名称和用户名
4. 获取 Bot Token

### 2. 本地开发

```bash
# 安装依赖
npm install

# 复制环境变量文件
cp .env.example .env

# 编辑 .env 文件，填入你的 Bot Token
# BOT_TOKEN=your_bot_token_here

# 启动开发服务器
npm run dev
```

### 3. 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 在 Vercel 项目设置中添加环境变量：
   - `BOT_TOKEN`: 你的 Telegram Bot Token
4. 部署完成后，获取你的 Vercel 域名
5. 设置 Telegram Webhook：

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://your-vercel-domain.vercel.app/api/webhook"}'
```

## 项目结构

```
├── src/                    # 源代码
│   ├── bot.ts             # 机器人主逻辑
│   ├── index.ts           # 应用入口
│   ├── commands/          # 命令处理器
│   │   └── help.ts        # /help 命令
│   ├── types/             # TypeScript 类型定义
│   │   └── index.ts
│   └── utils/             # 工具函数
│       └── config.ts      # 配置管理
├── api/                   # Vercel API 路由
│   └── webhook.ts         # Webhook 处理
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── vercel.json            # Vercel 配置
└── .env.example           # 环境变量示例
```

## 可用命令

### 开发命令

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建项目
npm run start      # 启动生产服务器
npm run lint       # 运行 ESLint
npm run lint:fix   # 自动修复 ESLint 错误
npm run format     # 格式化代码
npm run type-check # TypeScript 类型检查
```

### Bot 命令

- `/start` - 开始使用机器人
- `/help` - 显示帮助信息

## 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `BOT_TOKEN` | Telegram Bot Token | ✅ |
| `WEBHOOK_DOMAIN` | Webhook 域名（生产环境） | ❌ |
| `NODE_ENV` | 运行环境 | ❌ |
| `PORT` | 端口号（本地开发） | ❌ |

## 开发指南

### 添加新命令

1. 在 `src/commands/` 目录下创建新的命令文件
2. 在 `src/bot.ts` 中注册命令

```typescript
// src/commands/newcommand.ts
import { BotContext } from '../types/index.js';

export const newCommand = {
  command: 'new',
  description: '新命令描述',
  handler: async (ctx: BotContext) => {
    await ctx.reply('新命令响应');
  },
};

// src/bot.ts
import { newCommand } from './commands/newcommand.js';

// 在 createBot 函数中添加
bot.command(newCommand.command, newCommand.handler);
```

## 故障排除

### 常见问题

1. **Bot 不响应**
   - 检查 Bot Token 是否正确
   - 确认环境变量已正确设置

2. **Webhook 不工作**
   - 检查 Vercel 部署是否成功
   - 确认 Webhook URL 设置正确

3. **TypeScript 错误**
   - 运行 `npm run type-check` 检查类型错误
   - 确保所有依赖已正确安装

## 许可证

MIT License
