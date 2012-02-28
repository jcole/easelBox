fs = require 'fs'

{print} = require 'sys'
{spawn} = require 'child_process'

individual_file_args = ['-c', '-o', 'examples/js', 'src/examples']

# Listing files in order here -- order matters becauase of class inheiritance
joined_file_args = ['-c', '-j', 'examples/js/easelBox.js', 
  'src/easelBox/easelBoxObject',
  'src/easelBox/easelBoxCircle',
  'src/easelBox/easelBoxRectangle',
  'src/easelBox/easelBoxWorld',
]

messages = (coffee) ->
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()

task 'build', 'Build all changes', ->
  coffee = spawn 'coffee', individual_file_args
  messages coffee
  coffee = spawn 'coffee', joined_file_args
  messages coffee
  coffee.on 'exit', (code) ->
    callback?() if code is 0
  
task 'watch', 'Watch for changes', ->
  coffee = spawn 'coffee', ['-w'].concat(individual_file_args)
  messages coffee
  coffee = spawn 'coffee', ['-w'].concat(joined_file_args)
  messages coffee

