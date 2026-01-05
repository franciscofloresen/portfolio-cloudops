# Portfolio CloudOps - Francisco Flores

Portfolio personal desplegado con arquitectura serverless en AWS.

**URL:** https://d271kptnjzshy6.cloudfront.net

## Arquitectura

```
GitHub Actions (CI/CD)
        │
        ▼
   S3 Bucket ──────► CloudFront (CDN)
   (Static Host)     (HTTPS + Cache)
        │                   │
        └───────────────────┘
                │
                ▼
         Usuario Final
```

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Hosting | S3 (privado) + CloudFront |
| IaC | Terraform (backend remoto en S3) |
| CI/CD | GitHub Actions |
| Monitoreo | CloudWatch Alarms + SNS |

## AWS Well-Architected

| Pilar | Implementación |
|-------|----------------|
| Cost Optimization | Free Tier, Budget alert $20/mes |
| Security | HTTPS, S3 privado, OAC, IAM least privilege |
| Reliability | CloudFront multi-AZ, S3 11 9s durability |
| Performance | Edge locations globales, compresión |
| Operational Excellence | CI/CD automatizado, alertas |
| Sustainability | Serverless = recursos bajo demanda |

## Infraestructura

```
infra/
├── main.tf              # S3, CloudFront, IAM, Monitoring
└── backend-setup/
    └── main.tf          # S3 bucket + DynamoDB para tfstate
```

### Recursos creados

- `portfolio-ffe-100ebd32` - S3 bucket (contenido)
- `portfolio-ffe-tfstate` - S3 bucket (Terraform state)
- `portfolio-tflock` - DynamoDB (state locking)
- `E3F8OQJBJC6I35` - CloudFront distribution
- `github-actions-portfolio` - IAM user (CI/CD)
- CloudWatch Alarms (4xx, 5xx)
- SNS Topic (alertas email)
- Budget Alert ($20/mes)

## Monitoreo

| Alerta | Condición |
|--------|-----------|
| 5xx Errors | > 5% en 5 min |
| 4xx Errors | > 15% en 10 min |
| Budget Forecast | > 80% de $20 |
| Budget Actual | > 100% de $20 |

## CI/CD

Push a `main` → Build → Deploy a S3 → Invalidar CloudFront

### Secrets requeridos en GitHub

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET
AWS_CLOUDFRONT_DISTRIBUTION_ID
```

## Desarrollo Local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Genera dist/
```

## Deploy Manual

```bash
npm run build
aws s3 sync dist/ s3://portfolio-ffe-100ebd32 --delete
aws cloudfront create-invalidation --distribution-id E3F8OQJBJC6I35 --paths "/*"
```

## Costos Estimados

| Servicio | Free Tier | Post-Free |
|----------|-----------|-----------|
| S3 | 5GB | ~$0.023/GB |
| CloudFront | 1TB/mes | ~$0.085/GB |
| DynamoDB | 25GB | ~$0.25/GB |
| **Total** | **$0.00** | **<$1/mes** |
