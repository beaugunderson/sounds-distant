#!/usr/bin/env node

'use strict';

const botUtilities = require('bot-utilities');
const fs = require('fs');
const Twit = require('twit');
const _ = require('lodash');

require('with-env')();

const lines = fs.readFileSync('./distance-sorted.txt', 'utf-8').split(/\n/g);
const T = new Twit(botUtilities.getTwitterAuthFromEnv());

var program = require('commander');

program
  .command('tweet')
  .description('Generate and tweet a random sound')
  .option('-r, --random', 'only post a percentage of the time')
  .action(botUtilities.randomCommand(() => {
    const tweet = _.sample(lines);

    T.post('statuses/update', {status: tweet}, (err, data, response) => {
      if (err || response.statusCode !== 200) {
        console.log('Error sending tweet', err, response.statusCode);

        return;
      }
    });
  }));

program.parse(process.argv);
