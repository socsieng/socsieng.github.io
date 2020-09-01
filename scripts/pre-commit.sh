#!/usr/bin/env bash
set -e

# get the repository root
repo_folder=`git rev-parse --show-toplevel`

# use repository root if there is a value, otherwise use the current folder
root_folder=${repo_folder:-`pwd`}

echo "Performing image optimization for the first time can take a while. Sit tight..."

# execute image optimization and store results in a variable
optimized_images=`ruby $root_folder/scripts/optimize-images.rb`

if [ -n "$optimized_images" ]
then
  echo "$optimized_images" | while read image; do
    echo " - Optimized $image"
    git add "$image"
  done
fi

echo "Done."
