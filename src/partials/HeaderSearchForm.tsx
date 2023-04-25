"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function HeaderSearchForm() {
  const { searchValue, setSearchValue, handleSubmit } = useSearch();

  return (
    <form className="w-full max-w-[276px]" onSubmit={handleSubmit}>
      <div className="flex flex-wrap">
        <div className="w-full">
          <label className="block text-sm sr-only" htmlFor="search">
            Search
          </label>
          <div className="relative flex items-center">
            <input
              id="search"
              type="search"
              className="form-input py-1 w-full pl-10"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="absolute inset-0 right-auto flex items-center justify-center">
              <svg
                className="w-4 h-4 shrink-0 mx-3"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-slate-400"
                  d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm8.707 12.293a.999.999 0 11-1.414 1.414L11.9 13.314a8.019 8.019 0 001.414-1.414l2.393 2.393z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function useSearch() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (searchValue && searchValue.length > 0) {
      router.push(`/search/${searchValue}`);
    } else {
      router.push("/");
    }
  };
  return { searchValue, setSearchValue, handleSubmit };
}
