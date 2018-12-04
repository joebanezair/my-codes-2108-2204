#!/bin/bash

kubectl -n laiwan-staging apply -f deployment.yaml
kubectl -n laiwan-staging apply -f ingress.qipai-staging.yaml
