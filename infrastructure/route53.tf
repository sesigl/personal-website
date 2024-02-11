resource "aws_route53_zone" "primary" {
  name = "sebastiansigl.com"
}

resource "aws_route53_record" "verify" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = ""
  type    = "A"
  ttl     = 300
  records = ["76.76.21.21"]
}

resource "aws_route53_record" "cname" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "www"
  type    = "CNAME"
  ttl     = 300
  records = ["cname.vercel-dns.com"]
}

resource "aws_route53_record" "google_verification_txt" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = ""
  type    = "TXT"
  ttl     = 300
  records = [
    "google-site-verification=XPyaSlZabo5ucYd56L0VZd6-hFbyiQ0-lK0p3AxsxTA",
    "apple-domain=lYxPxVEiZphkzEnL",
    "v=spf1 include:icloud.com ~all"]
}

resource "aws_route53_record" "icloud_verification_mx" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = ""
  type    = "MX"
  ttl     = 300
  records = ["10 mx01.mail.icloud.com.", "10 mx02.mail.icloud.com."]
}

resource "aws_route53_record" "cname_icloud" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "sig1._domainkey"
  type    = "CNAME"
  ttl     = 300
  records = ["sig1.dkim.sebastiansigl.com.at.icloudmailadmin.com."]
}

resource "aws_route53_record" "cname_gumroad" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "store"
  type    = "CNAME"
  ttl     = 300
  records = ["domains.gumroad.com"]
}

resource "aws_route53_record" "cname_learn" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "learn"
  type    = "CNAME"
  ttl     = 300
  records = ["cname.vercel-dns.com."]
}

resource "aws_route53_record" "prod_learn_api" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "api.learn.sebastiansigl.com"
  type    = "A"

  alias {
    name                   = "d1q6r79usmskkd.cloudfront.net"
    zone_id                = "Z2FDTNDATAQYW2" # CloudFront's hosted zone ID
    evaluate_target_health = false
  }
}
