/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.sebastiansigl.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "https://sebastiansigl.com",
          "http://sebastiansigl.com",
          "http://www.sebastiansigl.com",
        ],
      },
    ],
  },
};
