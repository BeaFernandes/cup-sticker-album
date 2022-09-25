import type { GetStaticProps, NextPage } from "next";
import prisma from "../lib/prisma";
import { Album, Sticker } from "@prisma/client";
import { Card, Col, Row } from "antd";

interface AlbumProps {
  album: Album;
  collection: Array<Sticker>;
}

const gridStyle: React.CSSProperties = {
  width: "33.33%",
  textAlign: "center",
};

export default function Collection({ album, collection }: AlbumProps) {
  return (
    <div>
      <Card
        title="Álbum da Copa Qatar 2022"
        style={{ marginBottom: 15, fontWeight: "bold" }}
      >
        <Card.Grid style={gridStyle}>Total: {album.total}</Card.Grid>
        <Card.Grid style={gridStyle}>
          Total distintas: {album.total_distinct}
        </Card.Grid>
        <Card.Grid style={gridStyle}>Faltantes: {album.missing}</Card.Grid>
      </Card>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {collection?.map((sticker, index) => (
            <Col span={8} key={index}>
              <Card
                title={sticker.name}
                bordered={false}
                style={{ marginBottom: 15 }}
              >
                <div style={{ fontSize: 20 }}>{sticker.country}</div>
                <div>Quantidade: {sticker.amount}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const album = await prisma.album.findUnique({
    where: {
      id: 1,
    },
  });

  const collection = await prisma.sticker.findMany();

  return {
    props: {
      album,
      collection,
    },
    revalidate: 10,
  };
};
