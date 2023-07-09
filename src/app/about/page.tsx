import React from "react";
import WidgetNewsletter from "@/partials/WidgetNewsletter";
import WidgetSponsor from "@/partials/WidgetSponsor";
import Image from "next/image";
import configuration from "@/configuration";

function About() {
  return (
    <>
      {/* Content */}
      <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
        {/* Middle area */}
        <div className="grow">
          <div className="max-w-[700px]">
            <section>
              {/* Page title */}
              <h1 className="h1 font-aspekta mb-5">
                Hi. I&apos;m Sebastian{" "}
                <span className="inline-flex relative text-sky-500 before:absolute before:inset-0 before:bg-sky-200 dark:before:bg-sky-500 before:opacity-30 before:-z-10 before:-rotate-2 before:translate-y-1/4">
                  @sesigl
                </span>{" "}
                Sigl 🤟
              </h1>
              <Image
                className="w-full"
                src={"/images/about_v3.png"}
                width="692"
                height="390"
                alt="About"
              />
              {/* Page content */}
              <div className="text-slate-500 dark:text-slate-400 space-y-8">
                <div className="space-y-4">
                  <h2 className="h3 font-aspekta text-slate-800 dark:text-slate-100">
                    Short Bio
                  </h2>
                  <p>
                    I am a seasoned software engineer with over 17 years of
                    experience across various domains. In recent years, my focus
                    has been on highload server-side projects, data- and
                    machine-learning-driven applications, and platform
                    development, where I love tinkering with infrastructure,
                    containers, and Cloud Native technologies.
                  </p>
                  <p>
                    While there isn&apos;t a Wikipedia page about me (sorry
                    folks!), a media bio is available below.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="h3 font-aspekta text-slate-800 dark:text-slate-100">
                    Career
                  </h2>
                  <p>
                    As a Tech Lead for Adevinta, I have the honor of leading a
                    team that is dedicated to enhancing the search and relevancy
                    features of various use cases. Specifically, our focus is on
                    helping users find the perfect ads to suit their needs. I am
                    privileged to be a part of the core team at{" "}
                    <a
                      className="font-medium text-sky-500 hover:underline"
                      href="https://www.kleinanzeigen.de/"
                      target="_blank"
                    >
                      Kleinanzeigen
                    </a>
                    , one of the largest and most renowned classifieds markets
                    in the world. Together, we strive to provide the best user
                    experience and make meaningful contributions to the
                    industry.
                  </p>
                  <p>
                    As a result of the integration of various classifieds
                    enterprises under{" "}
                    <a
                      className="font-medium text-sky-500 hover:underline"
                      href="https://www.adevinta.com"
                      target="_blank"
                    >
                      Adevinta
                    </a>
                    , we have emerged as the preeminent global leader in
                    facilitating environmentally-conscious transactions of
                    second-hand goods.
                  </p>
                  <p>
                    Technology is my driving force, and I firmly believe that
                    anyone with a passion for it can learn to code. As a fervent
                    advocate of this ideology, my heart lies in{" "}
                    <a
                      className="font-medium text-sky-500 hover:underline"
                      href="https://twitter.com/sesigl"
                      target="_blank"
                    >
                      content creation
                    </a>
                    . It affords me the opportunity to connect with like-minded
                    individuals, stay up-to-date with the latest industry
                    trends, and witness the growth of other tech enthusiasts -
                    often younger generations - as they embark on their journey
                    in this dynamic field. I am deeply inspired by the idea that
                    we all stand on the shoulders of giants, and take great
                    pride in observing the exponential expansion of our
                    community.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="h3 font-aspekta text-slate-800 dark:text-slate-100">
                    Experience
                  </h2>
                  <ul className="-my-2">
                    {/* Role */}
                    <li className="relative py-2">
                      <div className="flex items-start mb-1">
                        <div
                          className="absolute left-0 h-full w-px bg-slate-200 dark:bg-slate-800 self-start ml-[28px] -translate-x-1/2 translate-y-3"
                          aria-hidden="true"
                        />
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            alt="Adevinta"
                            src="/images/logos/adevinta.png"
                            width="16"
                            height="16"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Dec 2022{" "}
                            <span className="text-slate-400 dark:text-slate-600">
                              ·
                            </span>{" "}
                            Present
                          </div>
                          <div className="font-aspekta font-[650] text-slate-800 dark:text-slate-100">
                            Tech Lead Relevancy & Personalization
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            Adevinta
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            As the Tech lead at Adevinta, it is my
                            responsibility to create an exceptional search
                            experience for advertising in Germany, which will be
                            seamlessly integrated into a global system. My focus
                            is on building a state-of-the-art solution that
                            leverages the latest technologies to meet the needs
                            of our users and exceed their expectations.
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* Role */}
                    <li className="relative py-2">
                      <div className="flex items-start mb-1">
                        <div
                          className="absolute left-0 h-full w-px bg-slate-200 dark:bg-slate-800 self-start ml-[28px] -translate-x-1/2 translate-y-3"
                          aria-hidden="true"
                        />
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            alt="eBay"
                            src="/images/logos/ebay.png"
                            width="32"
                            height="32"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Oct 2018{" "}
                            <span className="text-slate-400 dark:text-slate-600">
                              ·
                            </span>{" "}
                            Dec 2022
                          </div>
                          <div className="font-aspekta font-[650] text-slate-800 dark:text-slate-100">
                            Classifieds Senior Full-Stack Engineer | Tech Lead
                            Advertising
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            eBay
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            As a senior Full-Stack Engineer and later as a
                            tech-lead for advertising, I had the privilege of
                            leading a talented team in the development of a
                            cutting-edge global advertising configuration
                            management system. With scalability and flexibility
                            at the forefront of our approach, our system
                            empowered yield experts to optimize revenue while
                            maintaining maximum control.
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* Role */}
                    <li className="relative py-2">
                      <div className="flex items-start mb-1">
                        <div
                          className="absolute left-0 h-full w-px bg-slate-200 dark:bg-slate-800 self-start ml-[28px] -translate-x-1/2 translate-y-3"
                          aria-hidden="true"
                        />
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            alt="Mister Spex"
                            src="/images/logos/mister-spex.png"
                            width="32"
                            height="32"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Oct 2016{" "}
                            <span className="text-slate-400 dark:text-slate-600">
                              ·
                            </span>{" "}
                            Sep 2018
                          </div>
                          <div className="font-aspekta font-[650] text-slate-800 dark:text-slate-100">
                            Senior Full-Stack Engineer
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            MisterSpex
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            As a Senior Full-Stack Engineer, I had the privilege
                            of leading a team that spearheaded the evolution of
                            essential features in our system. One of our most
                            noteworthy accomplishments was the creation of an
                            innovative augmented reality application that
                            enabled our customers to virtually try on glasses.
                            This technology played a pivotal role in
                            transforming our primarily brick and mortar business
                            into a digital-first enterprise.
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* Role */}
                    <li className="relative py-2">
                      <div className="flex items-start mb-1">
                        <div
                          className="absolute left-0 h-full w-px bg-slate-200 dark:bg-slate-800 self-start ml-[28px] -translate-x-1/2 translate-y-3"
                          aria-hidden="true"
                        />
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            alt="Sopra Steria"
                            src="/images/logos/sopra-steria.png"
                            width="32"
                            height="32"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Oct 2014{" "}
                            <span className="text-slate-400 dark:text-slate-600">
                              ·
                            </span>{" "}
                            Sep 2016
                          </div>
                          <div className="font-aspekta font-[650] text-slate-800 dark:text-slate-100">
                            Mid-Level Backend Engineer
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            Sopra Steria
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            As a Mid-Level Full-Stack Engineer, I had the
                            opportunity to modernize a Java-Swing Application.
                            With great attention to detail, I focused on
                            extracting both frontend and backend components,
                            resulting in a significant improvement in backend
                            performance and frontend user-experience. Through
                            advocating for a test-first mentality, I ensured
                            that the components were not only successfully
                            extracted from a big monolith but were also easier
                            to change and caused fewer defects.
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* Role */}
                    <li className="relative py-2">
                      <div className="flex items-start mb-1">
                        <div className="absolute left-0 h-14 w-14 flex items-center justify-center border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 bg-white dark:bg-slate-900 rounded-full">
                          <Image
                            alt="Freelance"
                            src="/images/logos/freelance.png"
                            width="32"
                            height="32"
                          />
                        </div>
                        <div className="pl-20 space-y-1">
                          <div className="text-xs text-slate-500 uppercase">
                            Oct 2005{" "}
                            <span className="text-slate-400 dark:text-slate-600">
                              ·
                            </span>{" "}
                            Sep 2014
                          </div>
                          <div className="font-aspekta font-[650] text-slate-800 dark:text-slate-100">
                            High School, Computer Science Master & Freelancer
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
                            Self-Employed
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            From my teenage years onwards, coding has been my
                            passion. At the age of 17, I took on the ambitious
                            project of creating a Facebook clone for Turkey - a
                            significant accomplishment that marked the beginning
                            of my journey as a developer. Since then, I have
                            continued to hone my skills by working for various
                            companies on a contractual basis, all while pursuing
                            my education.
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h2 className="h3 font-aspekta text-slate-800 dark:text-slate-100">
                    Let&apos;s Connect
                  </h2>
                  <p>
                    I&apos;m excited to connect with others via{" "}
                    <a
                      className="font-medium text-sky-500 hover:underline"
                      href="mailto:akrillo89@gmail.com"
                    >
                      email
                    </a>{" "}
                    and{" "}
                    <a
                      className="font-medium text-sky-500 hover:underline"
                      target="_blank"
                      href={configuration.links.socialMedia.twitter}
                    >
                      Twitter
                    </a>{" "}
                    to chat about projects and ideas. Currently, I&apos;m not
                    taking on freelance projects, but I am open to hearing about
                    potential opportunities, discussing them with you and then
                    potentially collaborating if it&apos;s a good fit.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="md:w-[240px] lg:w-[300px] shrink-0">
          <div className="space-y-6">
            <WidgetNewsletter />
            <WidgetSponsor />
          </div>
        </aside>
      </div>
    </>
  );
}

export default About;
