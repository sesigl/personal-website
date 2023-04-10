import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <section>
      <div className="max-w-[700px]">
        <div className="pt-8 pb-10">
          <Image
            className="rounded-full mb-5"
            src={"/images/me.jpg"}
            width="56"
            height="56"
            alt="Me"
          />
          <h1 className="h1 font-aspekta mb-5">
            I write about coding and being a{" "}
            <span className="inline-flex relative text-sky-500 before:absolute before:inset-0 before:bg-sky-200 dark:before:bg-sky-500 before:opacity-30 before:-z-10 before:-rotate-2 before:translate-y-1/4">
              full-time
            </span>{" "}
            maker.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Writer, Speaker, Developer, and Co-Founder of Code.co, and
            AppForYou. I write about coding, startups, and my journey as a
            full-time maker.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
