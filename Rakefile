require 'rubygems'
require 'bundler/setup'

require 'pry-byebug'

require 'irb'

require './tasks/fetch_csse'
require './tasks/fetch_datadista'
require './tasks/fetch_italy'
require './tasks/fetch_france'
require './tasks/fetch_us'
require './tasks/fetch_nyc'

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
  FetchItaly.new.fetch
end

desc 'Fetch France'
task :fr do
  FetchFrance.new.fetch
end

desc 'Fetch USA'
task :us do
  FetchUS.new.fetch
end

desc 'Fetch USA'
task :us_now do
  FetchUS.new.fetch_current
end

desc 'Fetch NYC'
task :nyc do
  FetchNYC.new.fetch
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
