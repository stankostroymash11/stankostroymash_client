import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Edit() {
  const router = useRouter();
  useEffect(() => {
    router.push("/404");
  }, []);
  return <></>;
}
