# Portfolio Deployment Plan

## Arquitectura: S3 + CloudFront (100% Free Tier Eligible)

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

## AWS Well-Architected Alignment

| Pilar | Implementación |
|-------|----------------|
| **Cost Optimization** | S3 + CloudFront Free Tier: 1TB transfer/mes, 10M requests |
| **Security** | HTTPS via CloudFront, S3 bucket privado, OAC |
| **Reliability** | CloudFront 11 9s durability, multi-AZ automático |
| **Performance** | Edge locations globales, cache optimizado |
| **Operational Excellence** | CI/CD automatizado, zero manual deploys |
| **Sustainability** | Serverless = recursos bajo demanda |

## Costo Estimado

| Servicio | Free Tier | Costo Post-Free |
|----------|-----------|-----------------|
| S3 | 5GB storage | ~$0.023/GB |
| CloudFront | 1TB/mes, 10M req | ~$0.085/GB |
| **Total Mensual** | **$0.00** | <$1/mes típico |

## Implementación

### Fase 1: Infraestructura AWS
1. Crear S3 bucket (privado)
2. Crear CloudFront distribution con OAC
3. Configurar bucket policy para CloudFront

### Fase 2: CI/CD
1. Crear IAM user para GitHub Actions
2. Configurar secrets en GitHub
3. Crear workflow de deploy

### Fase 3: DNS (Opcional)
- Route 53 o DNS externo apuntando a CloudFront

## Secrets Requeridos en GitHub

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET
AWS_CLOUDFRONT_DISTRIBUTION_ID
```

## Comandos de Deploy Manual (Referencia)

```bash
# Build
npm run build

# Sync to S3
aws s3 sync dist/ s3://$BUCKET --delete

# Invalidate cache
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
```
