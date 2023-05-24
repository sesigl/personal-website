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
  records = ["google-site-verification=XPyaSlZabo5ucYd56L0VZd6-hFbyiQ0-lK0p3AxsxTA", "apple-domain=XMFMGL9LHP5pJW20", "v=spf1 include:icloud.com ~all"]
}

resource "aws_route53_record" "icloud_verification_mx" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = ""
  type    = "MX"
  ttl     = 300
  records = ["mx01.mail.icloud.com."]
}

resource "aws_route53_record" "icloud_verification_mx_2" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = ""
  type    = "MX"
  ttl     = 300
  records = ["mx02.mail.icloud.com."]
}

resource "aws_route53_record" "cname_icloud" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "sig1._domainkey"
  type    = "CNAME"
  ttl     = 300
  records = ["sig1.dkim.sebastiansigl.com.at.icloudmailadmin.com."]
}