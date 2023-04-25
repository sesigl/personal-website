import React from "react";

import SideNavigation from "@/partials/SideNavigation";
import Header from "@/partials/Header";
import WidgetNewsletter from "@/partials/WidgetNewsletter";
import WidgetSponsor from "@/partials/WidgetSponsor";
import WidgetPosts from "@/partials/WidgetPosts";
import Footer from "@/partials/Footer";
import Image from "next/image";
import BackButton from "@/partials/BackButton";

function Post() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="min-h-screen flex">
        <SideNavigation />

        {/* Main content */}
        <main className="grow overflow-hidden px-6">
          <div className="w-full h-full max-w-[1072px] mx-auto flex flex-col">
            <Header />

            {/* Content */}
            <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
              {/* Middle area */}
              <div className="grow">
                <div className="max-w-[700px]">
                  {/* Back */}
                  <BackButton />

                  <article>
                    {/* Post header */}
                    <header>
                      <div className="flex items-center justify-between mb-1">
                        {/* Post date */}
                        <div className="text-xs text-slate-500 uppercase">
                          <span className="text-sky-500">—</span> Dec 24, 2023{" "}
                          <span className="text-slate-400 dark:text-slate-600">
                            ·
                          </span>{" "}
                          4 Min read
                        </div>
                        {/* Share buttons */}
                        <ul className="inline-flex">
                          <li>
                            <a
                              className="flex justify-center items-center text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-500 transition duration-150 ease-in-out"
                              aria-label="Twitter"
                            >
                              <svg
                                className="w-8 h-8 fill-current"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a
                              className="flex justify-center items-center text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-500 transition duration-150 ease-in-out"
                              aria-label="Facebook"
                            >
                              <svg
                                className="w-8 h-8 fill-current"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M14.023 24 14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257Z" />
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a
                              className="flex justify-center items-center text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-500 transition duration-150 ease-in-out"
                              aria-label="Share"
                            >
                              <svg
                                className="w-8 h-8 fill-current"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M20 14c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .223.029.439.075.649l-3.22 2.012A2.97 2.97 0 0 0 12 13c-1.654 0-3 1.346-3 3s1.346 3 3 3a2.97 2.97 0 0 0 1.855-.661l3.22 2.012c-.046.21-.075.426-.075.649 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3a2.97 2.97 0 0 0-1.855.661l-3.22-2.012c.046-.21.075-.426.075-.649 0-.223-.029-.439-.075-.649l3.22-2.012A2.97 2.97 0 0 0 20 14Z" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <h1 className="h1 font-aspekta mb-4">
                        How to Control CSS Animations with JavaScript
                      </h1>
                    </header>
                    {/* Post content */}
                    <div className="text-slate-500 dark:text-slate-400 space-y-8">
                      <p>
                        When it comes to animations on the web, developers need
                        to measure the animation&apos;s requirements with the
                        right technology -- CSS or JavaScript.
                      </p>
                      <Image
                        className="w-full"
                        src={"/images/post-image.jpg"}
                        width="692"
                        height="390"
                        alt="Post"
                      />
                      <div className="space-y-4">
                        <p>
                          Web designers sometimes believe that animating in CSS
                          is more difficult than animating in JavaScript.{" "}
                          <strong className="font-medium text-slate-800 dark:text-slate-100">
                            While CSS animation does have some limitations
                          </strong>
                          , most of the time it&apos;s more capable than we give
                          it credit for! Not to mention, typically more
                          performant.
                        </p>
                        <p>
                          Coupled with a touch of JavaScript, CSS animations and
                          transitions are able to accomplish
                          hardware-accelerated animations and interactions more
                          efficiently than most JavaScript libraries. Let&apos;s
                          jump straight in!
                        </p>
                        <p>Let&apos;s jump straight in!</p>
                      </div>
                      <div className="space-y-4">
                        <h2 className="h2 font-aspekta text-slate-800 dark:text-slate-100">
                          Manipulating CSS Transitions
                        </h2>
                        <p>
                          There are countless questions on coding forums related
                          to triggering and pausing an element&apos;s
                          transition. The solution is actually quite simple
                          using JavaScript.
                        </p>
                        <p>
                          To trigger an element&apos;s transition, toggle a
                          class name on that element that triggers it.
                        </p>
                        <p>
                          To pause an element&apos;s transition, use
                          getComputedStyle and getPropertyValue at the point in
                          the transition you want to pause it.{" "}
                          <a className="font-medium text-sky-500 hover:underline">
                            Then set those CSS properties
                          </a>{" "}
                          of that element equal to those values you just got.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h2 className="h2 font-aspekta text-slate-800 dark:text-slate-100">
                          Using CSS “Callback Functions”
                        </h2>
                        <p>
                          Some of the most useful yet little-known JavaScript
                          tricks for manipulating CSS transitions and animations
                          are the DOM events they fire. Like:{" "}
                          <strong className="font-medium text-slate-800 dark:text-slate-100">
                            animationend, animationstart, and animationiteration
                            for animations
                          </strong>{" "}
                          and transitionend for transitions. You might guess
                          what they do. These animation events fire when the
                          animation on an element ends, starts, or completes one
                          iteration, respectively.
                        </p>
                        <p>
                          These events need to be vendor prefixed at this time,
                          so in this demo, we use a function developed by Craig
                          Buckler called PrefixedEvent, which has the parameters
                          element, type, and callback to help make these events
                          cross-browser. Here is his useful article on capturing
                          CSS animations with JavaScript. And{" "}
                          <a className="font-medium text-sky-500 hover:underline">
                            here is another one
                          </a>{" "}
                          determining which animation (name) the event is firing
                          for.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h2 className="h2 font-aspekta text-slate-800 dark:text-slate-100">
                          Manipulating CSS Transitions
                        </h2>
                        <p>
                          Like we just learned, we can watch elements and react
                          to animation-related events: animationStart,
                          animationIteration, and animationEnd. But what happens
                          if you want to change the CSS animation mid-animation?
                          This requires a bit of trickery!
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="h3 font-aspekta text-slate-800 dark:text-slate-100">
                          The animation-play-state Property
                        </h3>
                        <p>
                          The animation-play-state property of CSS is incredibly
                          helpful when you simply need to pause an animation and
                          potentially continue it later. You can change that CSS
                          through JavaScript like this (mind your prefixes):
                        </p>
                      </div>
                      <pre className="overflow-x-auto text-sm text-slate-500 bg-slate-800 p-4 rounded leading-tight">
                        <code className="font-pt-mono">
                          <span className="text-sky-300">element</span>.
                          <span className="text-sky-300">style</span>.
                          <span className="text-sky-300">
                            webkitAnimationPlayState
                          </span>{" "}
                          <span className="text-fuchsia-400">=</span>{" "}
                          <span className="text-emerald-400">
                            &quot;paused&quot;
                          </span>
                          ;{"\n\n"}
                          <span className="text-sky-300">element</span>.
                          <span className="text-sky-300">style</span>.
                          <span className="text-sky-300">
                            webkitAnimationPlayState
                          </span>{" "}
                          <span className="text-fuchsia-400">=</span>{" "}
                          <span className="text-emerald-400">
                            &quot;running&quot;
                          </span>
                          ;
                        </code>
                      </pre>
                      <div className="space-y-4">
                        <h3 className="h3 font-aspekta text-slate-800 dark:text-slate-100">
                          Obtaining the Current Keyvalue Percentage
                        </h3>
                        <p>
                          Unfortunately, at this time, there is no way to get
                          the exact current “percentage completed” of a CSS
                          keyframe animation.{" "}
                          <strong className="font-medium text-slate-800 dark:text-slate-100">
                            The best method to approximate it is using a
                            setInterval function
                          </strong>{" "}
                          that iterates 100 times during the animation, which is
                          essentially: the animation duration in ms / 100. For
                          example, if the animation is 4 seconds long, then the
                          setInterval needs to run every 40 milliseconds
                          (4000/100).
                        </p>
                      </div>
                      <pre className="overflow-x-auto text-sm text-slate-500 bg-slate-800 p-4 rounded leading-tight">
                        <code className="font-pt-mono">
                          <span className="text-sky-300">var showPercent</span>{" "}
                          <span className="text-fuchsia-400">=</span>{" "}
                          <span className="text-sky-300">window</span>.
                          <span className="text-sky-300">setInterval</span>
                          {"("}
                          <span className="text-emerald-400">function</span>
                          {"() {"}
                          {"\n\n"}
                          {"  "}
                          <span className="text-emerald-400">if</span> {"("}
                          <span className="text-sky-300">
                            currentPercent
                          </span>{" "}
                          <span className="text-fuchsia-400">&lt;</span>{" "}
                          <span className="text-pink-400">100</span>
                          {") {"}
                          {"\n\n"}
                          {"    "}
                          <span className="text-sky-300">
                            currentPercent
                          </span>{" "}
                          <span className="text-fuchsia-400">{"+="}</span>{" "}
                          <span className="text-pink-400">1</span>;{"\n\n"}
                          {"  }"} <span className="text-emerald-400">else</span>{" "}
                          {"{"}
                          {"\n\n"}
                          {"    "}
                          <span className="text-sky-300">
                            currentPercent
                          </span>{" "}
                          <span className="text-fuchsia-400">{"="}</span>{" "}
                          <span className="text-pink-400">0</span>;{"\n\n"}
                          {"  }"}
                          {"\n\n"}
                          {"  "}
                          percent{"\n\n"}
                          {"  "}
                          <span className="text-sky-300">result</span>.
                          <span className="text-sky-300">innerHTML</span>{" "}
                          <span className="text-fuchsia-400">=</span>{" "}
                          <span className="text-sky-300">currentPercent</span>;
                          {"\n\n"}
                          {"}"}, <span className="text-fuchsia-400">40</span>
                          {")"};
                        </code>
                      </pre>
                      <div className="space-y-4">
                        <h2 className="h2 font-aspekta text-slate-800 dark:text-slate-100">
                          Use Your Head
                        </h2>
                        <p>
                          Before starting to code, thinking about and planning
                          how a transition or animation should run is the best
                          way to minimize your problems and get the effect you
                          desire. Even better than Googling for solutions later!
                          The techniques and tricks overviewed in this article
                          may not always be the best way to create the animation
                          your project calls for.
                        </p>
                        <p>
                          Here&apos;s a little example of{" "}
                          <strong className="font-medium text-slate-800 dark:text-slate-100">
                            where getting clever with HTML and CSS
                          </strong>{" "}
                          alone can solve a problem where you might have thought
                          to go to JavaScript.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h2 className="h2 font-aspekta text-slate-800 dark:text-slate-100">
                          In Conclusion
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                          <li>
                            Developers used to need to choose between CSS and
                            JavaScript.
                          </li>
                          <li>
                            In JavaScript, CSS transitions are generally easier
                            to work with than CSS animations.
                          </li>
                          <li>
                            CSS Matrices are generally a pain to deal with,
                            especially for beginners.
                          </li>
                          <li>
                            Thinking about what should be done and planning how
                            to do it.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </article>
                </div>
              </div>

              {/* Right sidebar */}
              <aside className="md:w-[240px] lg:w-[300px] shrink-0">
                <div className="space-y-6">
                  <WidgetNewsletter />
                  <WidgetSponsor />
                  <WidgetPosts />
                </div>
              </aside>
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Post;
