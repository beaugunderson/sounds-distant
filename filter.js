#!/usr/bin/env node

'use strict';

const split = require('split');

const RE_SOUND = /\[([^\[\]]*?(softly|faintly|in\s+the\s+background|inaudibly|murmur|noiseless|soundless|distant|perimeter|outskirts|distance|remotely|periphery|quietly|outside|far[ -]+off|far[ -]+away)[^\[\]]*)\]/;

process.stdin.pipe(split()).on('data', (line) => {
  const match = RE_SOUND.exec(line);

  if (!match) {
    return;
  }

  let sound = match[1].toLowerCase();

  sound = sound
    .toLowerCase()
    .trim()
    .replace(/\s+/, ' ')
    .replace("beethoven'sode", "beethoven's ode")
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
    .replace(/ì/g, 'i')
    .replace(/♪/g, '')
    .replace(/ÿ/g, '')
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
      sound.includes('luigi')) {
    return;
  }

  console.log(sound);
});
