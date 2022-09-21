import type { GetStaticProps, NextPage } from "next";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import { Album } from "@prisma/client";

interface AlbumProps {
  album: Album;
}
export default function PageAlbum({ album }: AlbumProps) {
  return (
    <div>
      <div>Álbum</div>
      <br />

      <div>{album.owner}</div>
      <div>{album.total_distinct}</div>
      <div>{album.missing}</div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const album = await prisma.album.findUnique({
    where: {
      id: 1,
    },
  });
  return {
    props: {
      album,
    },
    revalidate: 10,
  };
};
