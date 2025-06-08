terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
}

resource "aws_acm_certificate" "certificate" {
  #  provider = aws.us_east1

  domain_name       = var.domain_name
  validation_method = "DNS"


  tags = {
    Name        = "${var.domain_name} Certificate"
    Environment = var.environment
  }
}

/*
Not needed anymore. Plan from 2025-06 showed a diff (it tried to add it again)
resource "aws_acm_certificate_validation" "certificate_validation" {
  #  provider = aws.us_east1

  certificate_arn         = aws_acm_certificate.certificate.arn
  validation_record_fqdns = [for record in aws_acm_certificate.certificate.domain_validation_options : record.resource_record_name]

  timeouts {
    create = "30m"
  }
}
*/

resource "aws_route53_record" "certificate_validation_record" {
  #  provider = aws.us_east1

  for_each = {
    for dvo in aws_acm_certificate.certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  name    = each.value.name
  records = [each.value.record]
  ttl     = 60
  type    = each.value.type
  zone_id = var.route53_zone_id
}
