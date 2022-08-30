import { useEffect, useState } from "react";

function useViewport() {
  const [width, setWidth] = useState(
    document.documentElement.clientWidth || document.documentElement.offsetWidth
  );

  useEffect(() => {
    const handleSetWidth = () => {
      const currentWidth =
        document.documentElement.clientWidth ||
        document.documentElement.offsetWidth;
      setWidth(currentWidth);
    };

    window.addEventListener("resize", handleSetWidth);

    return () => {
      window.removeEventListener("resize", handleSetWidth);
    };
  }, [width]);

  return width;
}

export default useViewport;
