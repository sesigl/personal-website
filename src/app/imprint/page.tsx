import WidgetNewsletter from "@/partials/WidgetNewsletter";
import WidgetSponsor from "@/partials/WidgetSponsor";

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
              <h1 className="h1 font-aspekta mb-5">Imprint</h1>
              {/* Page content */}
              <div className="text-slate-500 dark:text-slate-400 space-y-8">
                <div className="space-y-4">
                  <p>Published at 3.3.2023</p>
                  <p>
                    The responsible person/entity within the meaning of § 5 of
                    the Telemedia Act (Telemediengesetz,TMG) for the webpage
                    sebastiansigl.com is:
                  </p>
                  <p>
                    Sebastian Sigl, Roquettestr. 34, 01157 Dresden, akrillo89
                    [at] gmail.com
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
