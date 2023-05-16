import { primaryLinks } from "@/components/Menu/links";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/subcategory.module.css";
import CustomCard from "@/components/CustomCard";
import { endpoint } from "@/endpoint";

export default function SubCategory({ props }) {
  const router = useRouter();
  const title = primaryLinks
    .filter((item) => item.path === router.query.category)[0]
    .child.filter((i) => i.path === router.query.subcategory)[0].title;

  return (
    <>
      <Head>
        <title>СТАНКОСТРОЙМАШ | {title}</title>
        <meta
          name="keywords"
          content={
            "СТАНКОСТРОЙМАШ, станкостроймаш, " +
            primaryLinks
              .filter((item) => item.path === router.query.category)[0]
              .child.filter((i) => i.path === router.query.subcategory)[0]
              .title +
            " , " +
            primaryLinks.filter(
              (item) => item.path === router.query.category
            )[0].title
          }
        />
        <meta
          name="description"
          content={
            "СТАНКОСТРОЙМАШ, станкостроймаш, " +
            primaryLinks
              .filter((item) => item.path === router.query.category)[0]
              .child.filter((i) => i.path === router.query.subcategory)[0]
              .title +
            " , " +
            primaryLinks.filter(
              (item) => item.path === router.query.category
            )[0].title
          }
        />
      </Head>
      <div className={styles.wrapper}>
        {props.subCategory &&
          props.subCategory.map((item) => {
            return (
              <CustomCard
                key={item._id}
                image={`${endpoint.url}${item.photoPrimary}`}
                alt={item.title}
                title={item.title}
                shortDescription={item.shortDescription}
                link={`${router.asPath}/${item._id}`}
              />
            );
          })}
      </div>
    </>
  );
}
SubCategory.getInitialProps = async (ctx) => {
  const attr = `?category=${ctx.query.category}&subcategory=${ctx.query.subcategory}`;
  const res = await fetch(
    `${endpoint.url}api/getSubCategory${attr}`
  );
  const data = await res.json().then((res) => res);
  return {
    props: { subCategory: data },
  };
};
