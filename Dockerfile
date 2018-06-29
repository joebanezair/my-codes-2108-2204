From python:3.6

WORKDIR /opt/app

COPY src .

RUN pip install -r /opt/app/requirements.txt
