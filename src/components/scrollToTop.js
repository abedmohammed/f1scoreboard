import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (!prevPath.includes("race") || !pathname.includes("race")) {
      window.scrollTo(0, 0);
      setPrevPath(pathname);
    }
  }, [pathname, prevPath]);

  return null;
}
