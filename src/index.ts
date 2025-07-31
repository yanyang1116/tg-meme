import 'dotenv/config';
import { createBot } from './bot.js';
import { getConfig, validateConfig } from './utils/config.js';

async function main() {
  try {
    console.log('🚀 Starting TG Meme Bot...');
    
    const config = getConfig();
    validateConfig(config);
    
    const bot = createBot(config.botToken);
    
    // 开发环境使用长轮询
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔄 Starting bot in polling mode...');
      await bot.launch();
      
      // 优雅关闭
      process.once('SIGINT', () => bot.stop('SIGINT'));
      process.once('SIGTERM', () => bot.stop('SIGTERM'));
      
      console.log('✅ Bot is running in polling mode');
    } else {
      console.log('🌐 Bot is configured for webhook mode (production)');
    }
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}