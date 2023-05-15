import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Error() {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/404" || router.route === "/404") {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, []);
  return <div>404</div>;
}
