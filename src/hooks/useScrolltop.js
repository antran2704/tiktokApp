import { useEffect, useState } from "react";

function useScrollTop() {
  const [top, setTop] = useState(0);

  useEffect(() => {
    const handleTop = () => {
      const currentTop = document.documentElement.scrollTop || window.scrollY;
      setTop(currentTop);
    };

    window.addEventListener("scroll", handleTop);
    return () => {
      window.removeEventListener("scroll", handleTop);
    };
  }, [top]);

  return top;
}

export default useScrollTop;
