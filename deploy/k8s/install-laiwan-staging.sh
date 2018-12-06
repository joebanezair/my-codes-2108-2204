#!/bin/bash

kubectl -n laiwan-staging apply -f deployment.yaml
kubectl -n laiwan-staging apply -f ingress-laiwan-staging.yaml
