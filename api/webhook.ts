import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Telegraf } from 'telegraf';

let bot: Telegraf | null = null;

function initBot() {
  if (!bot) {
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      throw new Error('BOT_TOKEN environment variable is required');
    }
    
    bot = new Telegraf(botToken);
    
    // 简单的命令处理
    bot.start(async ctx => {
      await ctx.reply('👋 欢迎使用 TG Meme Bot！\n\n输入 /help 查看可用命令。');
    });
    
    bot.command('help', async ctx => {
      const helpMessage = `🤖 **TG Meme Bot 帮助**

**可用命令：**
/help - 显示此帮助信息
/start - 开始使用机器人

**功能介绍：**
这是一个简单的 Telegram 机器人。

---
💡 如需更多帮助，请联系管理员。`;
      
      await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
    });
    
    bot.on('text', async ctx => {
      const text = ctx.text.toLowerCase();
      if (text.includes('hello') || text.includes('hi') || text.includes('你好')) {
        await ctx.reply('Hello! 👋 输入 /help 查看可用命令。');
      } else {
        await ctx.reply('我不太明白你的意思。输入 /help 查看可用命令。');
      }
    });
    
    bot.catch((err, ctx) => {
      console.error('Bot error:', err);
      ctx.reply('抱歉，发生了一个错误。请稍后重试。');
    });
  }
  return bot;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({ 
        message: 'Webhook is working',
        hasToken: !!process.env.BOT_TOKEN
      });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const bot = initBot();
    
    // 处理 Telegram webhook
    await bot.handleUpdate(req.body);
    
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}