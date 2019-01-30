#!/bin/bash

rm src/ -R 

mv dist/forus-webshop.panel/assets/ assets/
mv dist/forus-webshop.panel/index.html .

mkdir sponsor
cd sponsor

mv ../dist/forus-platform.sponsor/assets/ assets/
mv ../dist/forus-platform.sponsor/index.html .

cd ..
mkdir validator
cd validator

mv ../dist/forus-platform.validator/assets/ assets/
mv ../dist/forus-platform.validator/index.html .

cd ..
mkdir provider
cd provider

mv ../dist/forus-platform.provider/assets/ assets/
mv ../dist/forus-platform.provider/index.html .
cd ..

rm dist/ -R
