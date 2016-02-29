#!/bin/bash

# [arg 1] is input file, complete path
# [arg 2] is output dir, complete path

echo 'input: ' $1
echo 'out dir: ' $2

var1=${1/'docx'/'odt'}
var2=${1/'docx'/'docx.tex'}

loffice --headless --convert-to odt --outdir $2 $1
w2l $var1 $var2 