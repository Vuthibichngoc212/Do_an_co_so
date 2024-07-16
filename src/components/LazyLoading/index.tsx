import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { StyledLazyLoading } from "./styled";

const LazyLoading = () => {
  const [color] = useState("#36d7b7");
  return (
    <StyledLazyLoading>
      <ClipLoader size={45} color={color} loading />
    </StyledLazyLoading>
  );
};

export default LazyLoading;
