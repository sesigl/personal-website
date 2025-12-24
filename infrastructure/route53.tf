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
    "v=spf1 include:icloud.com ~all",
  "brevo-code:ad6492b82d7f0b7cf48cbe7658d06a6c"]
}

# brevo auth
resource "aws_route53_record" "brevo_sendinblue_verification_txt_2" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "mail._domainkey"
  type    = "TXT"
  ttl     = 300
  records = ["k=rsa;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDeMVIzrCa3T14JsNY0IRv5/2V1/v2itlviLQBwXsa7shBD6TrBkswsFUToPyMRWC9tbR/5ey0nRBH0ZVxp+lsmTxid2Y2z+FApQ6ra2VsXfbJP3HE6wAO0YTVEJt1TmeczhEd2Jiz/fcabIISgXEdSpTYJhb0ct0VJRxcg4c8c7wIDAQAB"]
}
resource "aws_route53_record" "brevo_sendinblue_verification_txt_3" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "_dmarc"
  type    = "TXT"
  ttl     = 300
  records = ["v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com"]
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

# AWS SES MAIL FROM domain records
resource "aws_route53_record" "ses_mail_from_mx" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "mail"
  type    = "MX"
  ttl     = 300
  records = ["10 feedback-smtp.eu-central-1.amazonses.com"]
}

resource "aws_route53_record" "ses_mail_from_txt" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "mail"
  type    = "TXT"
  ttl     = 300
  records = ["v=spf1 include:amazonses.com ~all"]
}

# roast my code subdomain
resource "aws_route53_record" "cname_roastmycode" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = "roastmycode"
  type    = "CNAME"
  ttl     = 300
  records = ["b1dbe3c13e29928f.vercel-dns-017.com."]
}