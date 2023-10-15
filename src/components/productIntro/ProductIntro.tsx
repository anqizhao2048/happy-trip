import styles from "./ProductIntro.module.css";
import React from "react";
import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface PropsType {
  title: string;
  shortDescription: string;
  price: string | number;
  coupons: string;
  points: string;
  discount: string;
  rating: string | number;
  pictures: string[];
}

const columns: ColumnsType<RowType> = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
];

interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number;
}

export const ProductIntro: React.FC<PropsType> = ({
  title,
  shortDescription,
  price,
  rating,
  pictures,
}) => {

  const tableDataSource: RowType[] = [

  ];

  return (
    <div className={styles["intro-container"]}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{shortDescription}</Typography.Text>
      <div className={styles["intro-detail-content"]}>
        <Typography.Text style={{ marginLeft: 20 }}>
          $ <span className={styles["intro-detail-strong-text"]}>{price}</span>{" "}
          /per person
        </Typography.Text>
        <Typography.Text style={{ marginLeft: 50 }}>
          <span className={styles["intro-detail-strong-text"]}>Score: {rating}</span>{" "}
        </Typography.Text>
      </div>
      <Carousel autoplay slidesToShow={3}>
        {pictures.map((p) => (
          <Image height={150} src={p} />
        ))}
      </Carousel>
      <Table<RowType>
        columns={columns}
        dataSource={tableDataSource}
        size="small"
        bordered={false}
        pagination={false}
        showHeader={false}
      />
    </div>
  );
};
