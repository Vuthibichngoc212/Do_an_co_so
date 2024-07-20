import { Box, Button, Typography, useTheme } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box id="about-section" sx={{ marginTop: "100px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: theme.breakpoints.up("sm") ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          margin: "0px 70px",
        }}
      >
        <Box
          component="img"
          sx={{
            maxWidth: theme.breakpoints.up("sm") ? "35%" : "100%",
            width: "50%",
            height: "auto",
            borderRadius: "30px",
          }}
          src="https://launamgiakhanh.vn/storage/upload_image/images/Rectangle%2055.jpg"
          alt="Interior of ABC Restaurant"
        />
        <Box sx={{ flexBasis: theme.breakpoints.up("sm") ? "50%" : "100%" }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "black",
            }}
          >
            # Giới thiệu
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Chào mừng đến với{" "}
            <span style={{ color: "#4E8D7C" }}>nhà hàng 5 sao</span>
          </Typography>
          <Typography variant="body1" sx={{ color: "#625b5b", mb: 4 }}>
            Thương hiệu Nhà Hàng 5 Sao được thành lập năm 2008, phát triển không
            ngừng & dần khẳng định được vị thế của mình trong làng ẩm thực Việt
            Nam. Với tiêu chí mỗi sản phẩm đều được qua sàng lọc, chất chiu,
            tinh khiết và quý báu nhất từ thiên nhiên. Nhằm mang đến cho thực
            khách những món ăn có giá trị về chất lượng và luôn lấy tiêu chí
            “sức khỏe con người làm trung tâm”.
          </Typography>
          <Button
            onClick={() => navigate("/about")}
            sx={{
              backgroundColor: "#D5BBA2",
              padding: "10px 20px",
              color: "#4B2C20",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                outline: "none",
                backgroundColor: "#B89574",
              },
              "&:focus": {
                outline: "none",
              },
            }}
          >
            Tìm hiểu thêm{" "}
            <ArrowForwardIosIcon sx={{ fontSize: "small", ml: 1 }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSection;
