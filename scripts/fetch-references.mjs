#!/usr/bin/env node
/**
 * Downloads Kakao's own published imagery into public/reference/ for the
 * "Kakao/Reference" Storybook pages (side-by-side comparison).
 *
 * The images belong to Kakao Corp., so they are never committed or deployed:
 * public/reference/ is listed in .gitignore and .dockerignore.
 *
 * Sources:
 * - App Store screenshots (KakaoTalk, KR storefront)
 * - Kakao Business guide: AlimTalk and Brand Message content guides
 *
 * Usage: pnpm refs:fetch
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "reference");
const UA = { "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15" };

const APP_STORE = "https://apps.apple.com/kr/app/kakaotalk/id362057947";
const GUIDES = {
  alimtalk: "https://kakaobusiness.gitbook.io/main/ad/bizmessage/notice-friend/content-guide",
  brand: "https://kakaobusiness.gitbook.io/main/ad/brandmessage",
};

async function text(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function save(url, name) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(path.join(OUT, name), Buffer.from(await res.arrayBuffer()));
  console.log(`  ${name}`);
}

async function appStore() {
  const html = await text(APP_STORE);
  const bases = new Map();
  for (const m of html.matchAll(/https:\/\/is\d-ssl\.mzstatic\.com\/image\/thumb\/[^\s"',]+?\/(Kakaotalk_iOS_SC_KR_(\d+))\.png/g)) {
    bases.set(m[2], m[0]);
  }
  for (const [n, base] of [...bases].sort()) await save(`${base}/1290x2796bb.png`, `appstore-${n}.png`);
  return bases.size;
}

async function guide(prefix, url) {
  const html = await text(url);
  const files = [];
  const seen = new Set();
  // GitBook serves images through /~gitbook/image?url=<encoded file URL>.
  for (const m of html.matchAll(/~gitbook\/image\?url=([^&"\s\\]+)/g)) {
    let file = m[1];
    while (file.includes("%25")) file = decodeURIComponent(file);
    file = decodeURIComponent(file);
    const id = file.match(/uploads\/([A-Za-z0-9]+)\//)?.[1];
    if (!id || seen.has(id)) continue;
    seen.add(id);
    files.push(file.replace(/\/o\/(.+?)\?/, (_, p) => `/o/${encodeURIComponent(p)}?`));
  }
  let i = 0;
  for (const file of files) await save(file, `${prefix}-${String(++i).padStart(2, "0")}.png`);
  return files.length;
}

await mkdir(OUT, { recursive: true });
console.log("App Store screenshots");
const a = await appStore();
console.log("AlimTalk content guide");
const b = await guide("alimtalk", GUIDES.alimtalk);
console.log("Brand Message content guide");
const c = await guide("brand", GUIDES.brand);
console.log(`\nSaved ${a + b + c} images to public/reference/ (git-ignored, not deployed).`);
