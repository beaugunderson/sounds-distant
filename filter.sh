#!/bin/bash

pv < subs-2018.gz | gzcat | ./filter.js > distance-raw.txt

sort distance-raw.txt > distance-sorted.txt
sort distance-raw.txt | uniq -c  > distance-unique.txt
