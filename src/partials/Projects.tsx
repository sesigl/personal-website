import React from "react";
import Image from "next/image";

function Projects() {
  return (
    <section>
      <h2 className="font-aspekta text-xl font-[650] mb-5">Projects</h2>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
        <a
          href="https://skillmatch.de/"
          target="_blank"
          className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:-rotate-1 even:rotate-1 hover:rotate-0 transition-transform duration-700 hover:duration-100 ease-in-out p-5"
        >
          <div className="flex flex-col h-full">
            <div className="grow">
              <div className="h-10 w-10 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-full mb-2">
                <Image
                  alt="SkillMatch"
                  src={"/images/logos/skillmatch.svg"}
                  width="32"
                  height="32"
                  className="overflow-hidden rounded-2xl"
                />
              </div>
              <div className="text-lg font-aspekta font-[650] mb-1">
                Skill Match
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Finde und buche Experten, Coaches und Trainer basierend auf
                Skills
              </p>
            </div>
            <div className="text-sky-500 flex justify-end">
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="12"
              >
                <path d="M9.586 5 6.293 1.707 7.707.293 13.414 6l-5.707 5.707-1.414-1.414L9.586 7H0V5h9.586Z" />
              </svg>
            </div>
          </div>
        </a>
        <a
          href="https://github.com/sesigl/selysia"
          target="_blank"
          className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:-rotate-1 even:rotate-1 hover:rotate-0 transition-transform duration-700 hover:duration-100 ease-in-out p-5"
        >
          <div className="flex flex-col h-full">
            <div className="grow">
              <div className="h-10 w-10 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-full mb-2">
                <Image
                  alt="Selysia"
                  src={"/images/logos/ddd_template_go_v2.png"}
                  width="40"
                  height="40"
                />
              </div>
              <div className="text-lg font-aspekta font-[650] mb-1">
                DDD Template for GoLang projects
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                Domain Driven Design (DDD) template for Golang to properly
                organize a project with many useful tools set up.
              </p>
            </div>
            <div className="text-sky-500 flex justify-end">
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="12"
              >
                <path d="M9.586 5 6.293 1.707 7.707.293 13.414 6l-5.707 5.707-1.414-1.414L9.586 7H0V5h9.586Z" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export default Projects;
