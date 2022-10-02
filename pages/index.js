import Head from "next/head";
import Image from "next/image";
import fs from "fs";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { useI18n } from "../context/i18n";

export default function Home({ latestComics }) {
  const { t } = useI18n();

  return (
    <>
      <Head>
        <title>xkcd - Comics for developer</title>
        <meta name="description" content="Comics for developer" />
      </Head>

      <Layout>
        <h2 className="text-3xl font-bold text-center mb-10">
          {t("LATEST_COMICS")}
        </h2>
        <section className="grid grid-cols-1 gap-2 max-w-md m-auto justify-center sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map((comic) => (
            <Link href={`/comic/${comic.id}`} key={comic.id}>
              <a className="mb-4 pb-4 m-auto">
                <h3 className="text-xl font-bold text-center pb-2 text-black">
                  {comic.title}
                </h3>
                <div className="aspect-square">
                  <Image
                    className="aspect-square"
                    width={300}
                    height={300}
                    layout="intrinsic"
                    objectFit="contain"
                    src={comic.img}
                    alt={comic.alt}
                  />
                </div>
              </a>
            </Link>
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync("./comics");
  const latestComicsFiles = files.splice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map((file) => {
    const content = fs.readFileSync(`./comics/${file}`, "utf8");
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
