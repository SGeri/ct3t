terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.4"
    }
  }
}

provider "vercel" {
  api_token = var.VERCEL_API_TOKEN
}

resource "vercel_project" "example" {
  name      = "ct3t-next"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "SGeri/ct3t"
  }
}

variable "VERCEL_API_TOKEN" {
  type = string
}
