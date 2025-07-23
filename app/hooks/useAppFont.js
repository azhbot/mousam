// hooks/useAppFont.js
import { useSelector } from "react-redux";

const useAppFont = () => {
  const font = useSelector((state) => state.font.font);
  return font || "Poppins";
};

export default useAppFont;
