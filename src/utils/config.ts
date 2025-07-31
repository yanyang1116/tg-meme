import { Config } from '../types/index.js';

export function getConfig(): Config {
  const botToken = process.env.BOT_TOKEN;

  if (!botToken) {
    throw new Error('BOT_TOKEN environment variable is required');
  }

  const config: Config = {
    botToken,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  };

  if (process.env.WEBHOOK_DOMAIN) {
    config.webhookDomain = process.env.WEBHOOK_DOMAIN;
  }

  return config;
}

export function validateConfig(config: Config): void {
  if (!config.botToken) {
    throw new Error('Bot token is required');
  }

  if (config.botToken.length < 10) {
    throw new Error('Invalid bot token format');
  }
}
