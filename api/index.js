import { createProxy } from '@vercel/node';

const target = process.env.TARGET_DOMAIN;

if (!target) {
  throw new Error('TARGET_DOMAIN environment variable is not set');
}

const proxy = createProxy({
  target: target,
  changeOrigin: true,
  selfHandleResponse: true,
});

export default async function handler(req, res) {
  // کمی طبیعی‌تر کردن هدر
  req.headers['user-agent'] = req.headers['user-agent'] || 'Mozilla/5.0';
  
  proxy.web(req, res, {
    stream: true,
    selfHandleResponse: true,
  });
}
