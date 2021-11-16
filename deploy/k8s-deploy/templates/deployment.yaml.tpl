apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: {{ k8s_namespace }}
  name: {{ project_dns_name }}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: {{ project_dns_name }}
      server: {{ project_dns_name }}
  template:
    metadata:
      labels:
        app: {{ project_dns_name }}
        server: {{ project_dns_name }}
    spec:
      nodeSelector:
        stage: {{ stage }}
      containers:
      - name: {{ project_dns_name }}
        image: {{ docker_registry }}/laiwanio/{{ project }}_{{ stage }}:{{ docker_tag }}
        imagePullPolicy: Always
        env:
        - name: STAGE
          value: {{ stage }}
        ports:
        - containerPort: 80
      imagePullSecrets:
      - name: docker-registry-vpc-hk-laiwanio
---
apiVersion: v1
kind: Service
metadata:
  namespace: {{ k8s_namespace }}
  name: {{ project_dns_name }}
spec:
  ports:
  - port: 80
    targetPort: 80
  selector:
    server: {{ project_dns_name }}
