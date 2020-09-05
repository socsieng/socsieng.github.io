#!/usr/bin/env bash

file_path=$1
timestamp=$2
date_exp='[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9] [+-][0-9][0-9][0-9][0-9]'

modified_match=`cat $file_path | grep -E "^modified_date: *$date_exp"`

if [ -n "$modified_match" ]
then
  sed -i -E -e "s/^modified_date: *$date_exp/modified_date: $timestamp/" $file_path
else
  sed -i -E -e "s/^(date: *$date_exp)/\\1\\
modified_date: $timestamp/" $file_path
fi
