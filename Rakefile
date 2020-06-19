require 'rubygems'
require 'bundler/setup'

require 'pry-byebug'

require 'irb'

require './tasks/fetch_csse'
require './tasks/fetch_worldometers'
require './tasks/fetch_spain'
require './tasks/fetch_italy'
require './tasks/fetch_france'
require './tasks/fetch_uk'
require './tasks/fetch_us'
require './tasks/fetch_nyc'
require './tasks/process/summarize'

desc 'Fetch CSSE'
task :csse do
  FetchCSSE.new.fetch
end

desc 'Fetch WoM'
task :wom do
  FetchWorldometers.new.fetch
end

desc 'Fetch Spain'
task :es do
  FetchSpain.new.fetch
end

desc 'Fetch Spain Yesterday'
task :es_y do
  FetchSpain.new(DateTime.now - 1).fetch
end

desc 'Fetch Italy'
task :it do
  FetchItaly.new.fetch
end

desc 'Fetch Italy Yesterday'
task :it_y do
  FetchItaly.new(DateTime.now - 1).fetch
end

desc 'Fetch France'
task :fr do
  FetchFrance.new.fetch
end

desc 'Fetch France Yesterday'
task :fr_y do
  FetchFrance.new(DateTime.now - 1).fetch
end

desc 'Fetch UK'
task :uk do
  FetchUK.new.fetch
end

desc 'Fetch UK Yesterday'
task :uk_y do
  FetchUK.new(DateTime.now - 1).fetch
end

desc 'Fetch USA'
task :us do
  FetchUS.new.fetch
end

desc 'Fetch US Yesterday'
task :uS_y do
  FetchUS.new(DateTime.now - 1).fetch
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
  FetchSpain.new.fetch
  puts 'Press ENTER to continue'
  gets
  FetchItaly.new.fetch
  puts 'Press ENTER to continue'
  gets
end

desc 'Process'
task :process do
  data = DataProcessor.summarize_data
end
