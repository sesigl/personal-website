terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  cloud {
    organization = "social-media-post-scheduler"

    workspaces {
      name = "personal-website"
    }
  }

  required_version = ">= 1.2.0"
}

variable "aws_access_key" {
  default = ""
}
variable "aws_secret_key" {
  default = ""
}

provider "aws" {
  region     = "eu-central-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}
