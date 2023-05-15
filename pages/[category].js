import Head from "next/head";
import { useRouter } from "next/router";
import { primaryLinks } from "@/components/Menu/links";
import CustomCard from "@/components/CustomCard";

export default function Category({ props }) {
  const router = useRouter();
  const myTitle = primaryLinks.filter((item) => {
    if (item.path === router.query.category) {
      return item;
    }
  });

  return (
    <>
      <Head>
        <title>СТАНКОСТРОЙМАШ | {myTitle[0].title}</title>
        <meta
          name="keywords"
          content={"СТАНКОСТРОЙМАШ, станкостроймаш, " + myTitle[0].title}
        />
        <meta
          name="description"
          content={"СТАНКОСТРОЙМАШ, станкостроймаш, " + myTitle[0].title}
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
        {props.category &&
          props.category.map((item) => {
            return (
              <CustomCard
                key={item._id}
                image={`${process.env.NEXT_PUBLIC_API_HOST}${item.photoPrimary}`}
                alt={item.title}
                title={item.title}
                shortDescription={item.shortDescription}
                link={`${item.categoryEn}/${item.subCategoryEn}/${item._id}`}
              />
            );
          })}
      </div>
    </>
  );
}
Category.getInitialProps = async (ctx) => {
  const attr = `?category=${ctx.query.category}`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}api/getCategory${attr}`
  );
  const data = await res.json().then((res) => res);
  return {
    props: { category: data },
  };
};
