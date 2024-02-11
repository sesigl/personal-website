variable "domain_name" {
  description = "The domain name for the ACM certificate."
  type        = string
}

variable "environment" {
  description = "The environment tag for the ACM certificate (e.g., prod, dev)."
  type        = string
}

variable "route53_zone_id" {
  description = "The Route53 hosted zone ID where the DNS validation record will be created."
  type        = string
}
