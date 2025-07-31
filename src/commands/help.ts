import { BotContext } from '../types/index';

export const helpCommand = {
  command: 'help',
  description: '显示帮助信息',
  handler: async (ctx: BotContext) => {
    const helpMessage = `
🤖 **TG Meme Bot 帮助**

**可用命令：**
/help - 显示此帮助信息
/start - 开始使用机器人

**功能介绍：**
这是一个简单的 Telegram 机器人，支持基本的命令响应功能。

**使用方法：**
直接发送上述命令即可使用相应功能。

---
💡 如需更多帮助，请联系管理员。
    `.trim();

    await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
  },
};
