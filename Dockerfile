FROM node

EXPOSE 3000

COPY react_laiwan_com/ /opt/app
RUN cd /opt/app && yarn install --verbose

WORKDIR /opt/app/src