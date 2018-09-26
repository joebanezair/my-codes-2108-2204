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
      containers:
      - name: {{ project_dns_name }}
        image: registry.shafayouxi.org/kevinanew/{{ project }}:{{ docker_tag }}
        imagePullPolicy: Always
        ports:
        - containerPort: 8000
        command: ["/bin/sh"]
        args: ["-c", "python manage.py runserver"]
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
