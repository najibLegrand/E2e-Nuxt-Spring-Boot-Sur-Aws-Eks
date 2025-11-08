# Nuxt 3 + Spring Boot on AWS EKS – Starter

Mono-repo minimal: Nuxt (frontend) + Spring Boot (backend) + Helm/Terraform for EKS + GitLab CI + Sonar + AMP/AMG + CloudWatch + Gatling.

## Quick start
- Build locally:
  - Backend: `mvn -f backend/pom.xml spring-boot:run`
  - Frontend: `npm --prefix frontend ci && npm --prefix frontend run dev`
- Docker build:
  - `docker build -t local/catalog-back backend`
  - `docker build -t local/nuxt-front frontend`
- Kubernetes deploy:
  - `helm upgrade --install app infra/helm/app --namespace app --create-namespace`
