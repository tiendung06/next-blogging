import React from "react";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";

const DetailCast: React.FC = () => {
  const router = useRouter();
  const postId = router?.query?.id;

  const { data } = useSWR(
    `https://api.themoviedb.org/3/person/${postId}?api_key=25eac7bfded2875800a2dcebaa8ab051`,
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  );

  if (!data) return null;
  const {
    name,
    birthday,
    deathday,
    biography,
    place_of_birth,
    profile_path,
    popularity,
  } = data;

  return (
    <div className="mx-auto max-w-[1440px] font">
      <Head>
        <title>{name}</title>
      </Head>
      <div className="flex w-full md:justify-center px-5 pt-10 h-screen mobile:flex-col">
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
