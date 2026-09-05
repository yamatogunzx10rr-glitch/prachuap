const fs = require('fs');
const path = require('path');

// 1. กำหนด Domain ของคุณ
const DOMAIN = 'https://yourdomain.com';

// 2. ใส่รายการ Path ทั้งหมดในเว็บไซต์
const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/services', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.5', changefreq: 'yearly' }
];

// ดึงวันที่ปัจจุบันรูปแบบ YYYY-MM-DD
const currentDate = new Date().toISOString().split('T')[0];

// 3. ฟังก์ชันสร้าง XML String
function generateSitemapXml(pages) {
  const urlElements = pages.map((page) => {
    return `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq || 'weekly'}</changefreq>
    <priority>${page.priority || '0.5'}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

// 4. สร้างและบันทึกไฟล์ sitemap.xml
function build() {
  const xmlContent = generateSitemapXml(pages);
  const outputPath = path.join(__dirname, 'public', 'sitemap.xml'); // ปรับที่อยู่ไฟล์ปลายทางได้ตามต้องการ

  // สร้างโฟลเดอร์ปลายทางถ้ายังไม่มี
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, xmlContent, 'utf8');
  console.log(`✅ Sitemap created successfully at: ${outputPath}`);
}

build();