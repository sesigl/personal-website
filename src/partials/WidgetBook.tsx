import React from "react";
import Image from "next/image";

function WidgetBook() {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-800/30 odd:rotate-1 even:-rotate-1 p-5">
      <a href="https://sesigl.gumroad.com/" target="_blank">
        <div className="font-aspekta font-[650] text-center mb-3">
          Free Notion Templates
        </div>
        <div className="text-center">
          <Image
            className="inline-flex rounded-lg shadow-lg rotate-3"
            src={"/images/book-2.png"}
            width="148"
            height="190"
            alt="Book"
          />
        </div>
      </a>
    </div>
  );
}

export default WidgetBook;
