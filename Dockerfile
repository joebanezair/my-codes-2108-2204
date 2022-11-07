FROM node:8 as build-stage

COPY react_laiwan_com/ /opt/app
RUN cd /opt/app && yarn install --verbose --network-timeout 1000000000 --ignore-engines && yarn build

FROM nginx
# mock support 界面提交的 post 请求
COPY --from=build-stage /opt/app/default.conf /etc/nginx/conf.d/default.conf

# privacy / agreement / support 等界面
COPY --from=build-stage /opt/app/privacy.html /usr/share/nginx/html
COPY --from=build-stage /opt/app/privacy-en.html /usr/share/nginx/html
COPY --from=build-stage /opt/app/agreement.html /usr/share/nginx/html
COPY --from=build-stage /opt/app/src /usr/share/nginx/html/src
COPY --from=build-stage /opt/app/support.html /usr/share/nginx/html

COPY --from=build-stage /opt/app/dist /usr/share/nginx/html
COPY --from=build-stage /opt/app/robots.txt /usr/share/nginx/html
