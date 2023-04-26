/*
Sadly, Planetscale cannot be used with Terraform, since there is no official provider for it.
Also, the connection string, that would be supplied to the Vercel environment, is not retrievable from the Planetscale API.
Therefore, the connection string is supplied manually to the Vercel environment.

[TODO] Current plans are to include an S3 bucket for document uploading and SES Service for emailing in the Terraform config with AWS providers.
*/

terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.4"
    }
    upstash = {
      source  = "upstash/upstash"
      version = "1.3.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.3.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "4.64.0"
    }
  }
}

/* --- PROVIDERS --- */
provider "vercel" {
  api_token = var.VERCEL_API_TOKEN
}

provider "upstash" {
  email   = var.UPSTASH_EMAIL
  api_key = var.UPSTASH_API_KEY
}

provider "cloudflare" {
  api_token = var.CLOUDFLARE_API_TOKEN
}

provider "aws" {
  region     = local.REGION
  access_key = var.AWS_ACCESS_KEY
  secret_key = var.AWS_SECRET_KEY
}

/* --- RESOURCES --- */
resource "vercel_project" "next" {
  name      = "ct3t-next"
  framework = "nextjs"

  root_directory = "apps/next"
  build_command  = "cd ../.. && npm run build"

  // Should move each environment variable to separate resource
  // Because this way changes make this resource be recreated
  // And that generates new orgId and projId for the Vercel project
  environment = [
    {
      key    = "DATABASE_URL"
      value  = var.PLANETSCALE_DB_URL_PRODUCTION
      target = ["production"]
    },
    {
      key    = "DATABASE_URL"
      value  = var.PLANETSCALE_DB_URL_PREVIEW
      target = ["development", "preview"]
    },
    {
      key    = "UPSTASH_REDIS_REST_URL"
      value  = "https://${data.upstash_redis_database_data.redis_data.endpoint}"
      target = ["development", "preview", "production"]
    },
    {
      key    = "UPSTASH_REDIS_REST_TOKEN"
      value  = data.upstash_redis_database_data.redis_data.rest_token
      target = ["development", "preview", "production"]
    },
    {
      key    = "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
      value  = var.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
      target = ["development", "preview", "production"]
    },
    {
      key    = "CLERK_SECRET_KEY"
      value  = var.CLERK_SECRET_KEY
      target = ["development", "preview", "production"]
    },
    {
      key    = "SERVER_AWS_ACCESS_KEY"
      value  = var.AWS_ACCESS_KEY
      target = ["development", "preview", "production"]
    },
    {
      key    = "SERVER_AWS_SECRET_KEY"
      value  = var.AWS_SECRET_KEY
      target = ["development", "preview", "production"]
    },
    {
      key    = "AWS_S3_BUCKET"
      value  = aws_s3_bucket.production.bucket
      target = ["production"]
    },
    {
      key    = "AWS_S3_BUCKET"
      value  = aws_s3_bucket.preview.bucket
      target = ["development", "preview"]
    }
  ]
}

resource "vercel_project_domain" "next_domain" {
  project_id = vercel_project.next.id
  domain     = local.URL
}

resource "cloudflare_record" "record" {
  zone_id = var.CLOUDFLARE_ZONE_ID
  type    = "CNAME"
  name    = local.SUBDOMAIN
  value   = "cname.vercel-dns.com"
  proxied = true
}

resource "upstash_redis_database" "redis" {
  database_name = "ct3t-redis"
  region        = local.REGION
  tls           = "true"
}

resource "aws_s3_bucket" "production" {
  bucket = "ct3t-production"
}

resource "aws_s3_bucket" "preview" {
  bucket = "ct3t-preview"
}

resource "aws_s3_bucket_cors_configuration" "production" {
  bucket = aws_s3_bucket.production.id

  cors_rule {
    allowed_headers = local.BUCKET_CORS.allowed_headers
    allowed_methods = local.BUCKET_CORS.allowed_methods
    allowed_origins = local.BUCKET_CORS.allowed_origins
    expose_headers  = local.BUCKET_CORS.expose_headers
    max_age_seconds = local.BUCKET_CORS.max_age_seconds
  }
}

resource "aws_s3_bucket_cors_configuration" "preview" {
  bucket = aws_s3_bucket.preview.id

  cors_rule {
    allowed_headers = local.BUCKET_CORS.allowed_headers
    allowed_methods = local.BUCKET_CORS.allowed_methods
    allowed_origins = local.BUCKET_CORS.allowed_origins
    expose_headers  = local.BUCKET_CORS.expose_headers
    max_age_seconds = local.BUCKET_CORS.max_age_seconds
  }
}

/* --- DATA SOURCES --- */
data "upstash_redis_database_data" "redis_data" {
  database_id = resource.upstash_redis_database.redis.database_id
}

data "cloudflare_accounts" "accounts" {
  name = var.CLOUDFLARE_EMAIL
}