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
