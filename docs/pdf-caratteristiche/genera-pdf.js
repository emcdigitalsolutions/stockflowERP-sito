#!/usr/bin/env node
/**
 * Genera stockflow-caratteristiche.pdf (radice del sito) da docs/pdf-caratteristiche/caratteristiche.html
 * con Chrome headless (puppeteer-core).
 *
 * Uso (dalla radice del repo):
 *   node docs/pdf-caratteristiche/genera-pdf.js
 *   node docs/pdf-caratteristiche/genera-pdf.js --nome "Nuovo Nome"     (cambia il nome del prodotto)
 *   node docs/pdf-caratteristiche/genera-pdf.js --edizione "gennaio 2027"
 *
 * Variabili facoltative: CHROME_PATH (percorso di Chrome), PUPPETEER_CORE (percorso del modulo).
 *
 * Controlli automatici (lo script esce con errore se uno fallisce):
 *  - ogni foglio .page deve stare nell'A4 (nessun contenuto tagliato);
 *  - tutti i font devono essere caricati prima della stampa;
 *  - nel PDF prodotto ogni font deve risultare incorporato (FontFile/FontFile2/FontFile3 o Type3).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SRC = path.join(__dirname, 'caratteristiche.html');
const OUT = path.join(ROOT, 'stockflow-caratteristiche.pdf');
const NOME_ATTUALE = 'StockFlow ERP';

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
}

function loadPuppeteer() {
  const candidates = [process.env.PUPPETEER_CORE, 'puppeteer-core', 'C:/workspace/node_modules/puppeteer-core'].filter(Boolean);
  for (const c of candidates) {
    try { return require(c); } catch { /* prova il successivo */ }
  }
  throw new Error('puppeteer-core non trovato: installalo o imposta PUPPETEER_CORE');
}

function findChrome() {
  const list = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  const found = list.find((p) => fs.existsSync(p));
  if (!found) throw new Error('Chrome non trovato: imposta CHROME_PATH');
  return found;
}

function edizioneCorrente() {
  return new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric', timeZone: 'Europe/Rome' });
}

/**
 * Controllo dei font nel PDF: ogni font deve essere Type3 (glifi disegnati dentro il PDF, è così
 * che Chrome incorpora i webfont come Inter) oppure avere nel suo FontDescriptor un FontFile,
 * FontFile2 o FontFile3 (font incorporato). Chrome/Skia scrive oggetti "N 0 obj … endobj" in chiaro.
 */
function checkEmbeddedFonts(buf) {
  const s = buf.toString('latin1');
  const objs = new Map();
  const reObj = /(\d+) 0 obj\s*([\s\S]*?)endobj/g;
  let m;
  while ((m = reObj.exec(s))) objs.set(m[1], m[2]);
  const type3Descriptors = new Set();
  const fonts = [];
  for (const [id, body] of objs) {
    if (!/\/Type\s*\/Font\b/.test(body) || /\/Type\s*\/FontDescriptor/.test(body.slice(0, 40))) continue;
    const subtype = (body.match(/\/Subtype\s*\/(\w+)/) || [])[1];
    const fd = (body.match(/\/FontDescriptor\s+(\d+) 0 R/) || [])[1];
    const name = (body.match(/\/BaseFont\s*\/([^\s/<>\[\]]+)/) || [])[1] || `Type3-${id}`;
    if (subtype === 'Type3') { if (fd) type3Descriptors.add(fd); fonts.push(name); continue; }
    if (fd) fonts.push(name);
  }
  let descriptors = 0;
  let missing = 0;
  for (const [id, body] of objs) {
    if (!/\/Type\s*\/FontDescriptor/.test(body)) continue;
    descriptors++;
    if (type3Descriptors.has(id)) continue;
    if (!/\/FontFile[23]?\b/.test(body)) missing++;
  }
  return { descriptors, missing, fonts: [...new Set(fonts)] };
}

(async () => {
  const nome = arg('--nome');
  const edizione = arg('--edizione') || edizioneCorrente();

  let html = fs.readFileSync(SRC, 'utf8');
  if (nome && nome !== NOME_ATTUALE) html = html.split(NOME_ATTUALE).join(nome);
  html = html.replace(/<span class="edition">[^<]*<\/span>/, `<span class="edition">${edizione}</span>`);

  // File temporaneo accanto al sorgente: così i percorsi relativi restano validi.
  const tmp = path.join(__dirname, '.tmp-render.html');
  fs.writeFileSync(tmp, html, 'utf8');

  const puppeteer = loadPuppeteer();
  const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--no-sandbox', '--font-render-hinting=none'] });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('requestfailed', (r) => errors.push(`Risorsa non caricata: ${r.url()}`));
    await page.goto('file:///' + tmp.replace(/\\/g, '/'), { waitUntil: 'networkidle0', timeout: 60000 });
    await page.emulateMediaType('print');
    await page.evaluate(async () => { await document.fonts.ready; });

    const check = await page.evaluate(() => {
      const fontsOk = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`);
      const overflow = [...document.querySelectorAll('.page')].map((p, i) => {
        // Il contenuto non deve superare il foglio né invadere il piè di pagina.
        const foot = p.querySelector('.foot');
        const limit = foot ? foot.getBoundingClientRect().top - 2 : p.getBoundingClientRect().bottom;
        let maxBottom = 0;
        p.querySelectorAll('.block, .lead, .tiles, .band, .cards, .who, h1, .kicker').forEach((el) => {
          maxBottom = Math.max(maxBottom, el.getBoundingClientRect().bottom);
        });
        return { page: i + 1, overflow: p.scrollHeight > p.clientHeight + 1 || maxBottom > limit, spare: Math.round(limit - maxBottom) };
      });
      return { fontsOk, overflow, pages: document.querySelectorAll('.page').length };
    });

    if (errors.length) throw new Error('Errori nel render:\n' + errors.join('\n'));
    const bad = check.overflow.filter((o) => o.overflow);
    if (bad.length) throw new Error('Fogli che traboccano: ' + bad.map((b) => `${b.page} (${b.spare}px)`).join(', '));
    if (!check.fontsOk.some((f) => /Inter/.test(f))) throw new Error('Il font Inter non è stato caricato');

    await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });

    const buf = fs.readFileSync(OUT);
    const fonts = checkEmbeddedFonts(buf);
    if (fonts.missing) throw new Error(`${fonts.missing} font NON incorporati nel PDF`);

    console.log(`PDF creato: ${path.relative(ROOT, OUT)} (${(buf.length / 1024).toFixed(0)} KB, ${check.pages} pagine, edizione ${edizione})`);
    console.log('Spazio libero per foglio (px):', check.overflow.map((o) => `${o.page}:${o.spare}`).join('  '));
    console.log(`Font: ${fonts.descriptors} descrittori, tutti incorporati (Type3 o FontFile)`);
  } finally {
    await browser.close();
    fs.rmSync(tmp, { force: true });
  }
})().catch((e) => {
  console.error('ERRORE:', e.message);
  process.exit(1);
});
