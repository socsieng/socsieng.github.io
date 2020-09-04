#!/usr/bin/env bash

# Updates the modified_date attribute to the date last updated in git

set -e

script_folder=`cd $(dirname $0) && pwd`

file_path=$1
timestamp=`git log -1 --pretty="format:%ci" $file_path`

$script_folder/update-modified-date.sh "$file_path" "$timestamp"
