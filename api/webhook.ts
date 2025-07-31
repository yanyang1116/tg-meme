import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Telegraf } from 'telegraf';
import { BotContext } from '../src/types/index.js';
import { createBot } from '../src/bot.js';

let bot: Telegraf<BotContext> | null = null;

function initBot() {
  if (!bot) {
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      throw new Error('BOT_TOKEN environment variable is required');
    }
    bot = createBot(botToken);
  }
  return bot;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
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