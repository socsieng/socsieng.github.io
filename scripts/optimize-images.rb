#!/usr/bin/env ruby

require 'rubygems'
require 'bundler/setup'
require 'image_optim'

# resolve the root folder of the repository
root_folder = `git rev-parse --show-toplevel`.strip
if !File.directory?(root_folder) 
  root_folder = `pwd`.strip
end

# files to optimize: jpg, png, and gif files under assets/img
target_files = "#{root_folder}/assets/img/*.{jpg,png,gif}"

# instantiate ImageOtim with configuration options
image_optim = ImageOptim.new(
  :pngout => false,
  :svgo => false,
  :cache_dir => "#{root_folder}/temp"
)

# execute image optimization
image_optim.optimize_images!(Dir[target_files]) do |unoptimized, optimized|
  if optimized
    # print filename to stdout
    puts "#{optimized}"
  end
end
