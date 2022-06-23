import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export async function getStaticPaths() {
  const resp = await fetch(
    "https://api.themoviedb.org/3/person/popular?api_key=25eac7bfded2875800a2dcebaa8ab051"
  );
  const cast = await resp.json();
  const results = cast.results;
  return {
    paths: results.map((cast: any) => ({
      params: { id: cast.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const id = context.params.id;
  const resp = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=25eac7bfded2875800a2dcebaa8ab051`
  );
  const data = await resp.json();
  return {
    props: {
      cast: data,
    },
  };
}

const DetailCast: React.FC = ({ cast }: any) => {
  const {
    name,
    birthday,
    deathday,
    biography,
    place_of_birth,
    profile_path,
    popularity,
  } = cast;
  console.log(cast);
  return (
    <div className="mx-auto max-w-[1440px] font px-5 pt-10">
      <Head>
        <title>{name}</title>
      </Head>
      <Link href={"/"}>
        <a className="text-lg mb-10 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <p className="ml-5">Back to home</p>
        </a>
      </Link>
      <div className="flex w-full md:justify-center h-screen mobile:flex-col">
        <div className="w-[350px] max-h-[500px] mobile:w-full pb-5 flex justify-center">
          <Image
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt=""
            className="w-full h-full max-h-[500px] object-cover rounded-lg"
            width={350}
            height={500}
          />
        </div>
        <div className="px-10 mobile:px-0 w-full">
          <div className="">
            <h1 className="text-4xl mobile:text-3xl mobile:text-center font-bold mb-5">
              {name}
            </h1>
            <p className="mb-5">Birthday: {birthday || "Unknow"}</p>
            {deathday && <p className="mb-5">Deathday: {deathday}</p>}
            <p className="mb-5">Place of birth: {place_of_birth || "Unknow"}</p>
            <p className="mb-5">Popularity: {popularity || "Unknow"}</p>
            <div className="">
              <p className="mb-5">{biography}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCast;
