#!/bin/bash

kubectl -n laiwan-production apply -f deployment.yaml
kubectl -n laiwan-production apply -f ingress-laiwan-production.yaml
