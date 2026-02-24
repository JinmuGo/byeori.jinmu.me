# Byeori

<img src="./src/assets/byeori.svg" width="100" height="100" alt="Byeori" />

AI Supervision OS

## CI/CD (GitHub Actions → Cloudflare Pages)

Production deploy is automated via:

- Workflow: `.github/workflows/deploy-pages.yml`
- Trigger: push to `main` (and manual `workflow_dispatch`)
- Deploy command: `wrangler pages deploy out --project-name=byeori-neungsohwa --branch=main`

### Required GitHub Repository Secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Recommended Cloudflare setting

To avoid double deploys, disable Cloudflare Pages Git auto-deploy if you rely on this workflow as the single deploy path.
