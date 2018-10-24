#!/bin/bash

kubectl -n laiwan apply -f deployment.yaml
kubectl -n laiwan apply -f ingress.qipai-staging.yaml
