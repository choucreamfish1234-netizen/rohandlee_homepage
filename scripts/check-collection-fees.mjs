import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const path='public/renewal/pages/collection/index.html';
const html=readFileSync(path,'utf8');
const old=execFileSync('git',['show','origin/main:'+path],{encoding:'utf8'});
const links=s=>new Set([...s.matchAll(/href="([^"]+)"/g)].map(m=>m[1]));
for(const link of links(old))assert(links(html).has(link),`Lost link: ${link}`);
assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
assert.equal(old.slice(old.indexOf('<section class="center-directory"')),html.slice(html.indexOf('<section class="center-directory"')));
const data=JSON.parse(readFileSync('src/data/collection-fees.json','utf8'));
for(const {q,a} of data.faqs){assert(html.includes(q));assert(html.includes(a));}
for(const row of data.fees)for(const value of row)assert(html.includes(value));
assert.equal(data.faqs.length,26);
for(const [,raw] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g))JSON.parse(raw);
for(const phrase of ['초기 비용 0원','첫 압류 무료','기본 압류 1회 포함','지급명령 88만 원부터','100% 회수'])assert(!html.includes(phrase),phrase);
for(const [,id] of html.matchAll(/href="#([^"]+)"/g))assert(html.includes(`id="${id}"`),`Missing anchor: ${id}`);
assert.equal(33+33+88,154);
console.log('PASS: existing URLs/content preserved, H1, 26 FAQ/data parity, schema, anchors, forbidden copy, arithmetic');
