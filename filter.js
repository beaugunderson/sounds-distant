#!/usr/bin/env node

'use strict';

const split = require('split');

const words = [
  'atmospheric',
  'distance',
  'distant',
  'faintly',
  'far[ -]+away',
  'far[ -]+off',
  'in\\s+background',
  'in\\s+the\\s+background',
  'inaudibl',
  'indistinct',
  'murmur',
  'muted',
  'noiseless',
  'ominous',
  'outside',
  'outskirts',
  'perimeter',
  'periphery',
  'quietly',
  'remotely',
  'rumbling',
  'softly',
  'soundless',
  'whispered',
];

const badWords = [
  "they're showing",
  'cannon',
  'champions',
  'distant gun',
  'distant relative',
  'from a short distance',
  'gong xi',
  'gun click',
  'gun cocks',
  'gun fire',
  'gun firing',
  'gun shooting',
  'gun shot',
  'gunfight',
  'gunfire',
  'guns click',
  'guns firing',
  'gunshot',
  'her distant wedding',
  'hiking',
  'leaningontheeverlastingarms',
  'luigi',
  'machine gun',
  'machine-gun',
  'millibars',
  'shooting gun',
  'this open door',
  'though the distance',
];

const RE_INNER = `(${words.join('|')})`;

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
    .replace('whlrrlng', 'whirring')
    .replace('whlmperlng', 'whimpering')
    .replace('p. a .', 'p.a.')
    .replace('lowrumbling', 'low rumbling')
    .replace('girln-', 'girl -')
    .replace(/ ,/, ',')
    .replace(/ì/g, 'i')
    .replace(/ÿ/g, '')
    .replace(/♪/g, '')
    .replace(/♫/g, '')
    .replace(/¶/g, '')
    .replace(/§/g, '')
    .replace(/η/g, 'h')
    .replace(/τ/g, 't')
    .replace(/\/n/g, 'in')
    .replace(/^{/, '')
    .replace(/[~#,.]+$/, '')
    .replace(/^[~#,.]+/, '')
    .replace(/^# /, '')
    .replace(/^i church/, 'church')
    .trim();

  if (badWords.some((word) => sound.includes(word))) {
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
