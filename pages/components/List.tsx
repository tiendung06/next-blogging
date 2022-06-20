import React from "react";
import useSWR from "swr";
import Card from "./Card";

const List: React.FC = () => {
  const { data } = useSWR(
    "https://api.themoviedb.org/3/person/popular?api_key=25eac7bfded2875800a2dcebaa8ab051",
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  );

  const cast = data?.results;
  if (!cast || cast.length <= 0) return null;

  return (
    <div className="grid gap-3 item mx-auto py-5">
      {cast.map((item: any) => (
        <Card
          key={item.id}
          name={item.name}
          id={item.id}
          profile_path={item.profile_path}
        ></Card>
      ))}
    </div>
  );
};

export default List;
