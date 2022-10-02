import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

export function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const q = searchRef.current?.value;

  const handleChange = () => {
    if (q) {
      fetch(`/api/search?q=${q}`)
        .then((res) => res.json())
        .then((searchResults) => {
          setResults(searchResults);
        });
    } else {
      setResults([]);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="font-bold">
        <Link href="/">
          <a>
            next<span className="font-light">xkcd</span>
          </a>
        </Link>
      </h1>

      <nav>
        <ul className="flex flex-row gap-2">
          <li>
            <input
              className="border-gray-400 border-opacity-80 border-2 rounded-md placeholder:text-center"
              type="search"
              onChange={handleChange}
              placeholder="Search"
              ref={searchRef}
            />
            <div className="relative z-10">
              {results.length > 0 && (
                <div className="absolute top-0 left-0">
                  <ul className="z-50 overflow-hidden w-full border rounded-lg shadow-xl border-gray-50 bg-white">
                    <li className="m-0" key={"all results"}>
                      <Link href={`/search?q=${q}`}>
                        <a className="block text-gray-400 px-2 py-1 text-sm font-semibold hover:bg-slate-200 text-ellipsis whitespace-nowrap">
                          {`Ver ${results.length} resultados`}
                        </a>
                      </Link>
                    </li>

                    {results.map((result) => (
                      <li className="m-0" key={result.id}>
                        <Link href={`/comic/${result.id}`}>
                          <a className="block px-2 py-1 text-sm font-semibold hover:bg-slate-200 text-ellipsis whitespace-nowrap">
                            {result.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
