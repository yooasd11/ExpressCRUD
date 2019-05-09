sudo docker run --name webserver2 -v ./build:/usr/share/nginx/html:ro -d -p 80:80 nginx
