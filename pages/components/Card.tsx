import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface ICardProps {
  id: number;
  name: string;
  profile_path: string;
}

const Card: React.FC<ICardProps> = (props) => {
  const router = useRouter();
  const { id, name, profile_path } = props;
  const detailPage = () => {
    router.push({
      pathname: "/[id]",
      query: {
        id: id,
      },
    });
  };

  return (
    <div
      className="movie-card flex flex-col rounded-lg p-3 bg-white shadow-lg max-w-[500px] min-h-[250px] cursor-pointer m-3"
      onClick={detailPage}
    >
      <div className="w-full h-[250px] mb-5 image overflow-hidden flex justify-center">
        <div className="relative w-full h-full">
          <Image
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt={name}
            className="object-cover rounded-lg mb-5 transition-all"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-black text-center">{name}</h3>
    </div>
  );
};

export default Card;
