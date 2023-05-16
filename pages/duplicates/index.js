import CustomCard from "@/components/CustomCard";
import { endpoint } from "@/endpoint";
import Head from "next/head";

export default function Duplicates({ props }) {

  return (
    <>
      <Head>
        <title>СТАНКОСТРОЙМАШ | Запчасти</title>
        <meta
          name="keywords"
          content="СТАНКОСТРОЙМАШ, станкостроймаш, запчасти"
        />
        <meta
          name="description"
          content="СТАНКОСТРОЙМАШ, станкостроймаш, запчасти"
        />
      </Head>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "15px",
          justifyContent: "center",
          paddingTop: "15px",
          flexFlow: "column wrap",
          flexDirection: "row",
          marginTop: "15px",
          overflowY: "auto",
        }}
      >
        {props.duplicates &&
          props.duplicates.map((item) => {
            return (
              <CustomCard
                key={item._id}
                image={`${endpoint.url}${item.photoPrimary}`}
                alt={item.title}
                title={item.title}
                shortDescription={item.shortDescription}
                link={`${item.categoryEn}/${item._id}`}
              />
            );
          })}
      </div>
    </>
  );
}
Duplicates.getInitialProps = async () => {
  const res = await fetch(
    `${endpoint.url}api/getDuplicates`
  );
  const data = await res.json().then((res) => res);
  return {
    props: { duplicates: data },
  };
};
