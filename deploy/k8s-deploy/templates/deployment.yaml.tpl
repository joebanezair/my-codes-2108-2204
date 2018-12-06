apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: {{ project_dns_name }}
spec:
  replicas: 3
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
        image: registry.cn-hongkong.aliyuncs.com/laiwanio/{{ project }}:{{ docker_tag }}
        imagePullPolicy: Always
        ports:
        - containerPort: 8000
        env:
        - name: STAGE
          value: {{ stage }}
        command: ["/bin/sh"]
        args: ["-c", "python manage.py runserver --config configs.$STAGE"]
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
    targetPort: 8000
  selector:
    server: {{ project_dns_name }}
