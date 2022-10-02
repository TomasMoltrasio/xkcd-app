import { Layout } from "../../components/Layout";
import Head from "next/head";
import { search } from "../../services/search";
import Link from "next/link";
import Image from "next/image";

export default function Search({ query, results }) {
  console.log(results);

  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content="Comics for developer" />
      </Head>
      <Layout>
        <h1 className="mb-3">Resultado para {query}</h1>
        <ul className="grid grid-cols-3 text-center gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {results.map((comic) => (
            <li
              className="bg-gray-400 shadow-xl border-black border-2 rounded-md p-1"
              key={comic.id}
            >
              <h5 className="text-sm pb-1 font-light">{comic.title}</h5>
              <Link href={`/comic/${comic.id}`}>
                <a>
                  <Image
                    width={80}
                    height={80}
                    src={comic.img}
                    alt={comic.alt}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { q = "" } = query;

  const { results } = await search({ query: q });

  return {
    props: {
      query: q,
      results,
    },
  };
}
