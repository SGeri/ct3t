locals {
  REGION      = "eu-central-1"
  SUBDOMAIN   = "ct3t"
  DOMAIN      = "sarffy.dev"
  URL         = "${local.SUBDOMAIN}.${local.DOMAIN}"
  
  BUCKET_CORS = {
    allowed_headers = ["Authorization", "Content-Length", "Content-Type"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}
