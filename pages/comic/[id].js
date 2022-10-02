import Head from "next/head";
import Image from "next/image";
import fs from "fs";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { basename } from "path";

export default function Comic({
  id,
  img,
  alt,
  title,
  width,
  height,
  hasPrevius,
  hasNext,
  prevId,
  nextId,
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developer</title>
        <meta name="description" content="Comics for developer" />
      </Head>
      <Layout>
        <section className="aspect-square text-center">
          <h1 className="text-3xl font-bold text-center mb-10">{title}</h1>
          <Image
            className="aspect-square"
            width={width || 300}
            height={height || 300}
            layout="intrinsic"
            objectFit="contain"
            src={img}
            alt={alt}
          />
          <p>{alt}</p>
          <div className="flex justify-between mt-4 font-bold p-4">
            {hasPrevius && (
              <Link href={`/comic/${prevId}`}>
                <a className="mr-4 text-gray-600">⬅️ Previous</a>
              </Link>
            )}
            {hasNext && (
              <Link href={`/comic/${nextId}`}>
                <a className="ml-4 text-gray-600">➡️ Next</a>
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const locales = ["en", "es"];
  const files = fs.readdirSync("./comics");
  let paths = [];
  // locales → ['es', 'en]
  locales.forEach((locale) => {
    const localePaths = files.map((file) => {
      const id = basename(file, ".json");
      return { locale, params: { id } };
    });
    paths = [...paths, ...localePaths];
  });

  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const content = fs.readFileSync(`./comics/${params.id}.json`, "utf8");
  const comic = JSON.parse(content);
  const idNumber = Number(params.id);
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const hasPrevius = fs.existsSync(`./comics/${prevId}.json`);
  const hasNext = fs.existsSync(`./comics/${nextId}.json`);

  if (comic.width === undefined || comic.height === undefined) {
    comic.width = 300;
    comic.height = 300;
  }

  return {
    props: {
      ...comic,
      hasPrevius,
      hasNext,
      prevId,
      nextId,
    },
  };
}
