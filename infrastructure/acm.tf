module "prod_api_certificate" {
  source          = "./modules/acm_certificate"
  domain_name     = "api.learn.sebastiansigl.com"
  environment     = "prod"
  route53_zone_id = aws_route53_zone.primary.id

  providers = {
    aws = aws.us_east_1
  }
}

