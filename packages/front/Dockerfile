from nginx:alpine

COPY ./dist /usr/share/nginx/html

RUN echo $'server {\n\
  listen       80;\n\
  server_name  localhost;\n\
  location / {\n\
    root   /usr/share/nginx/html;\n\
    index  index.html index.htm;\n\
    try_files $uri /index.html =404;\n\
  }\n\
}\n'\
> /etc/nginx/conf.d/default.conf

EXPOSE 80
