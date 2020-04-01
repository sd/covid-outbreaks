require 'rubygems'
require 'bundler/setup'

require 'pry-byebug'

require 'irb'

require './tasks/fetch_csse'
require './tasks/fetch_datadista'

desc 'Fetch CSSE'
task :csse do
  FetchCSSE.new.fetch
end

desc 'Fetch Datadista'
task :es do
  FetchDatadista.new.fetch
end

desc 'Fetch All'
task :default do
  FetchCSSE.new.fetch
  puts 'Press ENTER to continue'
  gets
  FetchDatadista.new.fetch
  puts 'Press ENTER to continue'
  gets
end
