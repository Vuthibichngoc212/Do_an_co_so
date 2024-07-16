import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import useStyles from "./SlideScreen.styte";

const images = [
  "https://launamgiakhanh.vn/storage/slider/1920x980/2-Slide-1.webp",
  "https://launamgiakhanh.vn/storage/slider/1920x980/3-Slide-2.webp",
  "https://launamgiakhanh.vn/storage/slider/1920x980/1-Slide-8.webp",
];

const SlideScreen = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % images.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [activeStep]);

  return (
    <Box sx={{ position: "relative", width: "100%", marginTop: "100px" }}>
      <IconButton className={classes.iconButton} onClick={handleBack}>
        <ArrowBackIosIcon />
      </IconButton>
      <img
        src={images[activeStep]}
        alt={`Slide ${activeStep}`}
        style={{ width: "100%", height: "auto" }}
      />
      <IconButton
        sx={{
          position: "absolute",
          right: 0,
          marginRight: "30px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          },
          "&:focus": {
            outline: "none",
          },
        }}
        onClick={handleNext}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};
export default SlideScreen;
