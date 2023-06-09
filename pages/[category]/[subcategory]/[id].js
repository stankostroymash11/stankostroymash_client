import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "../../../styles/id.module.css";
import { useRouter } from "next/router";
import ActBlock from "@/components/ActBlock";
import { getCookie } from "@/utils/cookies";
import Head from "next/head";
import { endpoint } from "@/endpoint";

export default function SubCategoryId({ props }) {
  const [images, setImages] = useState([]);
  const [state, setState] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (props?.data?.photos) {
      props.data.photos.map((item) => {
        setImages((images) => [
          ...images,
          {
            original: `${endpoint.url}${item.substring(1)}`,
            thumbnail: `${endpoint.url}${item.substring(
              1
            )}`,
          },
        ]);
      });
    } else {
      router.push("/404");
    }
  }, [props]);

  useEffect(() => {
    if (!getCookie("token")) {
      return setState(false);
    }
    setState(true);
  }, []);

  useEffect(() => {
    if (!props) {
      router.push("/404");
    }
  }, [props]);

  return (
    <>
      <Head>
        <title>СТАНКОСТРОЙМАШ | Станки</title>
        <meta
          name="keywords"
          content="СТАНКОСТРОЙМАШ, станкостроймаш, станки, станок"
        />
        <meta
          name="description"
          content="СТАНКОСТРОЙМАШ, станкостроймаш, станки, станок"
        />
      </Head>
      {props.data && (
        <div className={styles.wrapp}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "center" }}
          >
            {props.data.subCategory}
          </Typography>
          <div className={styles.wrappCard}>
            <Card variant="outlined" className={styles.card}>
              <ImageGallery
                items={images && images}
                showBullets
                showPlayButton={false}
                showIndex
                showFullscreenButton={true}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.data.title}
                </Typography>
                {props ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: props.data.shortDescription }}
                  ></div>
                ) : (
                  ""
                )}
                <Typography gutterBottom variant="h5" component="div">
                  Цена:{" "}
                  {Number.parseInt(props.data.price)
                    ? props.data.price + " р."
                    : props.data.price}
                </Typography>
              </CardContent>
            </Card>
          </div>
          {state && (
            <ActBlock
              title={props.data.title}
              id={props.data._id}
              category={props.data.categoryEn}
            />
          )}
        </div>
      )}
    </>
  );
}
SubCategoryId.getInitialProps = async (ctx) => {
  const res = await fetch(
    `${endpoint.url}api/getItem/${ctx.query.id}`
  );
  const data = await res.json().then((res) => res);
  return {
    props: { data },
  };
};
