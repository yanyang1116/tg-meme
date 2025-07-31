import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 简单测试环境变量
    const botToken = process.env.BOT_TOKEN;
    
    if (req.method === 'GET') {
      return res.status(200).json({ 
        message: 'Webhook is working',
        hasToken: !!botToken,
        method: req.method
      });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!botToken) {
      return res.status(500).json({ error: 'BOT_TOKEN not configured' });
    }

    // TODO: 处理 Telegram webhook
    return res.status(200).json({ ok: true, message: 'Webhook received' });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}