fs = require 'fs'

{print} = require 'sys'
{spawn} = require 'child_process'

individual_file_args = ['-c', '-b', '-o', 'public/js/mylib', 'src/coffee']

# Explicitly listing coffee files in order here -- important because
# some classes extend another, and those must already be defined.
# Painful--better way?
joined_file_args = ['-c', '-b', '-j', 'public/js/project.js', 
  'src/coffee/main',
  'src/coffee/easel_box2d_object',
  'src/coffee/easel_box2d_image'
  'src/coffee/game'   
]

messages = (coffee) ->
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()

task 'build', 'Build mylib/ from src/', ->
  coffee = spawn 'coffee', individual_file_args
  messages coffee
  coffee = spawn 'coffee', joined_file_args
  messages coffee
  coffee.on 'exit', (code) ->
    callback?() if code is 0
  
task 'watch', 'Watch src/ for changes', ->
  coffee = spawn 'coffee', ['-w'].concat(individual_file_args)
  messages coffee
  coffee = spawn 'coffee', ['-w'].concat(joined_file_args)
  messages coffee

  