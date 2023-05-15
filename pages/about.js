import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Typography from "@mui/material/Typography";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>СТАНКОСТРОЙМАШ | О нас</title>
      </Head>
      <div style={{ width: "80%", overflowY: "auto" }}>
        <div
          style={{
            width: "90%",
            padding: "15px",
            boxSizing: "border-box",
            margin: "15px auto",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "center" }}
          >
            Адрес: Воронеж, ул. Димитрова, 83
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "center" }}
          >
            e-mail: stankostroymash@mail.ru
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "center" }}
          >
            Телефон: +7 (910) 342-55-88
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ textAlign: "center" }}
          >
            Режим работы: Пн. - Пт.: 9:00 - 18:00
          </Typography>
        </div>
        <div
          style={{
            width: "90%",
            padding: "15px",
            boxSizing: "border-box",
            margin: "15px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <YMaps query={{ lang: "ru_RU", apikey: "" }}>
            <Map
              width={700}
              height={600}
              defaultState={{ zoom: 15, center: [51.669691, 39.26025] }}
            >
              <Placemark
                geometry={[51.669691, 39.26025]}
                options={{
                  iconImageSize: [30, 30],
                  draggable: false,
                  preset: "islands#redIcon",
                }}
                properties={{
                  iconContent: "+",
                }}
              />
            </Map>
          </YMaps>
        </div>
      </div>
    </>
  );
}
