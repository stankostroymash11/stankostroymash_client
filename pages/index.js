import Head from "next/head";
import { primaryLinks } from "@/components/Menu/links";
import SubCategoryListBlock from "@/components/SubCategoryListBlock";
import styles from "../styles/index.module.css";

export default function Index() {
  return (
    <>
      <Head>
        <title>СТАНКОСТРОЙМАШ | Главная</title>
      </Head>
      <div className={styles.wrapper}
      >
        {primaryLinks.map((item) => {
          if (item.child) {
            return <SubCategoryListBlock key={item.id} name={item.title} images={item.child} parent={item.path} />;
          }
          if (item.title === "Запчасти") {
            return <SubCategoryListBlock key={item.id} name={item.title} images={[item]} />;
          }
        })}
      </div>
    </>
  );
}
