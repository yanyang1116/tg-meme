import { Context } from 'telegraf';

export interface BotContext extends Context {
  // 可以在这里扩展上下文类型
}

export interface BotCommand {
  command: string;
  description: string;
  handler: (ctx: BotContext) => Promise<void> | void;
}

export interface Config {
  botToken: string;
  webhookDomain?: string;
  port?: number;
}
