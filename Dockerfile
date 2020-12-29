FROM node:8 as build-stage

COPY react_laiwan_com/ /opt/app
RUN cd /opt/app && yarn install --verbose --network-timeout 1000000000 --ignore-engines && yarn build

FROM nginx
COPY --from=build-stage /opt/app/dist /usr/share/nginx/html
COPY --from=build-stage /opt/app/privacy.html /usr/share/nginx/html
COPY --from=build-stage /opt/app/agreement.html /usr/share/nginx/html
COPY --from=build-stage /opt/app/robots.txt /usr/share/nginx/html
