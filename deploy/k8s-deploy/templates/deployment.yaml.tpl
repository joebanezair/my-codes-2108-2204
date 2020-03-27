apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: {{ project_dns_name }}
spec:
{% if stage == 'production' %}
  replicas: 3
{% else %}
  replicas: 2
{% endif %}
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
        image: registry.eu-central-1.aliyuncs.com/laiwanio/{{ project }}:{{ docker_tag }}
        imagePullPolicy: Always
        resources:
{% if stage == 'production' %}
          requests:
            cpu: 5m
            memory: 100Mi
          limits:
            cpu: 500m
            memory: 200Mi
{% else %}
          requests:
            cpu: 1m
            memory: 50Mi
          limits:
            cpu: 100m
            memory: 200Mi
{% endif %}
        ports:
        - containerPort: 8000
        env:
        - name: STAGE
          value: {{ stage }}
      imagePullSecrets:
      - name: docker-registry-secret
---
apiVersion: v1
kind: Service
metadata:
  name: {{ project_dns_name }}
spec:
  ports:
  - port: 80
    targetPort: 80
  selector:
    server: {{ project_dns_name }}
