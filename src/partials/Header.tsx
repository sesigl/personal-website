import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import HeaderSearchForm from "@/partials/HeaderSearchForm";

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between h-16 before:block">
        <div className="grow flex justify-end space-x-4">
          {/* Search form */}
          <HeaderSearchForm />
          {/* Light switch */}
          <ThemeToggle />

          {/* Button */}
          <div>
            <Link
              className="btn-sm text-slate-100 bg-sky-500 hover:bg-sky-600"
              href="/subscribe"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
