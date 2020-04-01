require 'rubygems'
require 'bundler/setup'

require 'pry-byebug'

require 'irb'

require './tasks/fetch_csse'
require './tasks/fetch_datadista'
require './tasks/fetch_italy'

desc 'Fetch CSSE'
task :csse do
  FetchCSSE.new.fetch
end

desc 'Fetch Datadista'
task :es do
  FetchDatadista.new.fetch
end

desc 'Fetch Italy'
task :it do
  FetchItaly.new.fetch_all
end

desc 'Fetch All'
task :default do
  FetchCSSE.new.fetch
  puts 'Press ENTER to continue'
  gets
  FetchDatadista.new.fetch
  puts 'Press ENTER to continue'
  gets
  FetchItaly.new.fetch
  puts 'Press ENTER to continue'
  gets
end
