#!/usr/bin/env node

'use strict';

const split = require('split');

const RE_INNER = '(' +
  'distance|' +
  'distant|' +
  'faintly|' +
  'far[ -]+away|' +
  'far[ -]+off|' +
  'in\\s+background|' +
  'in\\s+the\\s+background|' +
  'inaudibl|' +
  'indistinct|' +
  'murmur|' +
  'noiseless|' +
  'outside|' +
  'outskirts|' +
  'perimeter|' +
  'periphery|' +
  'quietly|' +
  'remotely|' +
  'softly|' +
  'soundless' +
  ')';

const RE_SOUND_1 = new RegExp(`\\[([^[\\]]*?${RE_INNER}[^[\\]]*)\\]`, 'g');
const RE_SOUND_2 = new RegExp(`\\(([^()]*?${RE_INNER}[^()]*)\\)`, 'g');

function handleMatch(sound) {
  sound = sound
    .toLowerCase()
    .trim()
    .replace(/\s+/, ' ')
    .replace("beethoven'sode", "beethoven's ode")
    .replace('" p"', 'p')
    .replace('"deguello"plays', '"deguello" plays')
    .replace('brides wall', 'brides wail')
    .replace('béowing', 'blowing')
    .replace('cackies', 'cackles')
    .replace('childr en', 'children')
    .replace('childrenarguingfaintly', 'children arguing faintly')
    .replace('clanglng', 'clanging')
    .replace('distantiy', 'distantly')
    .replace('e. t.', 'e.t.')
    .replace('musi playing', 'music playing')
    .replace('neeping', 'beeping')
    .replace('paying softly', 'praying softly')
    .replace('yellingindistinctly', 'yelling indistinctly')
    .replace(/ì/g, 'i')
    .replace(/ÿ/g, '')
    .replace(/♪/g, '')
    .replace(/η/g, 'h')
    .replace(/\/n/g, 'in')
    .replace(/^{/, '')
    .replace(/[#,.]+$/, '')
    .replace(/^[#,.]+/, '')
    .replace(/^# /, '')
    .replace(/^i church/, 'church')
    .trim();

  if (sound.includes('hiking') ||
      sound.includes('her distant wedding') ||
      sound.includes('though the distance') ||
      sound.includes('leaningontheeverlastingarms') ||
      sound.includes('this open door') ||
      sound.includes('gong xi') ||
      sound.includes('from a short distance') ||
      sound.includes('champions') ||
      sound.includes("they're showing") ||
      sound.includes('luigi')) {
    return;
  }

  console.log(sound);
}

process.stdin.pipe(split()).on('data', (line) => {
  let match;

  while ((match = RE_SOUND_1.exec(line)) !== null) {
    handleMatch(match[1].toLowerCase());
  }

  while ((match = RE_SOUND_2.exec(line)) !== null) {
    handleMatch(match[1].toLowerCase());
  }
});
