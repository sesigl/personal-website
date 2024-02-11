terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  cloud {
    organization = "learn-to-code"

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

# US-East-1 is required for certain AWS Services like managed certificates that should be wired to API Gateway
provider "aws" {
  alias = "us_east_1"
  region = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}
