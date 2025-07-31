import { Telegraf } from 'telegraf';
import { BotContext } from './types/index';
import { helpCommand } from './commands/help';

export function createBot(token: string): Telegraf<BotContext> {
  const bot = new Telegraf<BotContext>(token);

  // 中间件：错误处理
  bot.catch((err, ctx) => {
    console.error('Bot error:', err);
    ctx.reply('抱歉，发生了一个错误。请稍后重试。');
  });

  // 启动命令
  bot.start(async ctx => {
    const welcomeMessage = `
👋 欢迎使用 TG Meme Bot！

这是一个简单的 Telegram 机器人。

输入 /help 查看可用命令。
    `.trim();

    await ctx.reply(welcomeMessage);
  });

  // 注册 /help 命令
  bot.command(helpCommand.command, helpCommand.handler);

  // 默认消息处理
  bot.on('text', async ctx => {
    const text = ctx.text.toLowerCase();
    
    if (text.includes('hello') || text.includes('hi') || text.includes('你好')) {
      await ctx.reply('Hello! 👋 输入 /help 查看可用命令。');
    } else {
      await ctx.reply('我不太明白你的意思。输入 /help 查看可用命令。');
    }
  });

  return bot;
}