const sharp = require('sharp');
const fs = require('fs');

(async () => {
  const svgLogo = fs.readFileSync('/var/www/dev-frontend/public/color_logo-slogan.svg');

  const logoBuf = await sharp(svgLogo, { density: 600 })
    .resize({ width: 800, height: null, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logoBuf).metadata();
  console.log('logo:', logoMeta.width, 'x', logoMeta.height);

  const bgSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F5F4FF"/>
        <stop offset="100%" stop-color="#EDE9FE"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="0" y="610" width="1200" height="20" fill="#635BFF" opacity="0.4"/>
    <text x="600" y="540" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#6B7C93">purplehere.com</text>
  </svg>`;

  const top = Math.round((630 - logoMeta.height) / 2) - 40;
  await sharp(Buffer.from(bgSvg))
    .composite([{ input: logoBuf, top, left: 200 }])
    .png({ quality: 95, compressionLevel: 9 })
    .toFile('/var/www/dev-frontend/public/og-image.png');

  const out = await sharp('/var/www/dev-frontend/public/og-image.png').metadata();
  const stat = fs.statSync('/var/www/dev-frontend/public/og-image.png');
  console.log('og-image.png:', out.width, 'x', out.height, '  size:', (stat.size/1024).toFixed(1), 'KB');
})().catch(e => { console.error('ERR', e); process.exit(1); });
