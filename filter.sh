#!/bin/bash

pv < subs.gz | gzcat | ./filter.js > distance-raw.txt

sort distance-raw.txt > distance-sorted.txt
sort distance-raw.txt | uniq -c  > distance-unique.txt
