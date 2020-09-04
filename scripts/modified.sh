#!/usr/bin/env bash

# Updates the modified_date attribute to the date last modified

set -e

script_folder=`cd $(dirname $0) && pwd`

file_path=$1
timestamp=`date -r $file_path "+%F %T %z"`

$script_folder/update-modified-date.sh "$file_path" "$timestamp"
