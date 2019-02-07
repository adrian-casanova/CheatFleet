echo 'Building App'
cd ..
npm run build
echo "Uploading HTML"
echo "--------------"
scp -i ./certificates/id_rsa -P 21098 ./build/index.html cheaqiqs@198.54.116.93:/home/cheaqiqs/public_html
echo " "
echo "Uploading JS and CSS"
echo "--------------"
scp -i ./certificates/id_rsa -P 21098 -r ./build/static cheaqiqs@198.54.116.93:/home/cheaqiqs/public_html
