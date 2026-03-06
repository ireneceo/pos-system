#!/usr/bin/env node

/**
 * Convert images to .webp format for Features page
 *
 * Usage:
 *   node scripts/convert-to-webp.js <module_code> <source_dir>
 *
 * Examples:
 *   node scripts/convert-to-webp.js menu_management /tmp/menu-screenshots
 *   node scripts/convert-to-webp.js live_orders /tmp/live-orders
 *
 * Input: any image files (png, jpg, etc) — filenames don't matter
 * Output: /images/features/{module_code}/1.webp, 2.webp, 3.webp ...
 * Size: 1480x833 (16:9), quality 85
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DEFAULT_OUTPUT = '/var/www/dev-frontend/public/images/features';
const TARGET_WIDTH = 1920;
const TARGET_HEIGHT = 1080;
const QUALITY = 92;

const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.tif', '.webp', '.avif'];

async function convertImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'cover',
        position: 'top'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log(`  ${path.basename(inputPath)} → ${path.basename(outputPath)} (${(outputStats.size / 1024).toFixed(0)}KB, ${saved}% saved)`);
    return true;
  } catch (err) {
    console.error(`  ERROR: ${path.basename(inputPath)} - ${err.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node scripts/convert-to-webp.js <module_code> <source_dir>');
    console.log('');
    console.log('Example: node scripts/convert-to-webp.js menu_management /tmp/menu-screenshots');
    console.log('Output:  /images/features/menu_management/1.webp, 2.webp, ...');
    process.exit(1);
  }

  const moduleCode = args[0];
  const sourceDir = args[1];
  const outputDir = path.join(DEFAULT_OUTPUT, moduleCode);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const stats = fs.statSync(sourceDir);
  let files = [];

  if (stats.isDirectory()) {
    files = fs.readdirSync(sourceDir)
      .filter(f => SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort()
      .map(f => path.join(sourceDir, f));
  } else if (stats.isFile()) {
    files = [sourceDir];
  }

  if (files.length === 0) {
    console.log('No supported image files found.');
    process.exit(1);
  }

  console.log(`Converting ${files.length} image(s) for [${moduleCode}]`);
  console.log(`Size: ${TARGET_WIDTH}x${TARGET_HEIGHT}, Quality: ${QUALITY}`);
  console.log(`Output: ${outputDir}/\n`);

  let success = 0;
  for (let i = 0; i < files.length; i++) {
    const outputPath = path.join(outputDir, `${moduleCode}_${i + 1}.webp`);
    if (await convertImage(files[i], outputPath)) success++;
  }

  console.log(`\nDone: ${success}/${files.length} converted.`);
}

main().catch(console.error);
