import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { eraseCookie, getCookie } from "@/utils/cookies";
import axios from "axios";

export default function App({ Component, pageProps }) {
  const [state, setState] = useState(false);

  const delCookies = () => {
    eraseCookie("token")
    eraseCookie("user")
  };

  const suc = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_HOST}api/get-me`, {
        token: getCookie("token"),
      })
      .then(function (response) {
        setState(() => response.data.success);
      })
      .catch(function (error) {
        console.log(error);
        delCookies();
      });
  };
  useEffect(() => {
    suc();
  }, []);
  return (
    <Layout statusCookies={state} del={setState}>
      <Component {...pageProps} />
    </Layout>
  );
}
