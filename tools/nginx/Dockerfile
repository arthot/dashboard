FROM nginx:1.14
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /etc/nginx/conf.d/*
COPY conf.d /etc/nginx/conf.d
