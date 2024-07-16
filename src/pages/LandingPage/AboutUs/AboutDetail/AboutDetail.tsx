import { Box, Typography } from "@mui/material";
import MenuBar from "../../../../components/organisms/Menu/menuBar";
import useStyles from "./AboutDetail.style";

const AboutDetail = () => {
  const classes = useStyles();

  return (
    <Box sx={{ marginTop: "100px" }}>
      <MenuBar />
      <Box className={classes.imgHeader}>
        <img
          src="https://launamgiakhanh.vn/storage/upload_image/images/banner-gioi-thieu.jpg"
          alt="Interior of ABC Restaurant"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box sx={{ margin: "80px 100px" }}>
        <Box>
          <Typography variant="h4" className={classes.title}>
            Về chúng tôi
          </Typography>

          <Box
            sx={{ minWidth: "50px", margin: "0.9em auto", textAlign: "center" }}
          >
            <img
              src="https://launamgiakhanh.vn/storage/upload_image/images/dau.png"
              alt="Interior of ABC Restaurant"
            />
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Thương hiệu Lẩu Nấm Gia Khánh được thành lập năm 2008, phát triển
            không ngừng & dần
            <br />
            khẳng định được vị thế của mình trong làng ẩm thực Việt Nam.
          </Typography>

          <Box
            sx={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <Box sx={{ position: "relative", marginBottom: "50px" }}>
              <img
                src="https://launamgiakhanh.vn/storage/upload_image/images/ve-chung-toi-3.png"
                alt="Interior of ABC Restaurant"
              />
              <Box sx={{ zIndex: 1, position: "absolute", top: "35%" }}>
                <Typography className={classes.textContentImg}>
                  Với tiêu chí đó mỗi sản phẩm của Lẩu Nấm Gia Khánh đều được
                  qua sàng lọc, chắt chiu, tinh khiết và quý báu nhất từ thiên
                  nhiên. Nhằm mang đến cho thực khách những món ăn có giá trị về
                  chất lượng và luôn lấy tiêu chí “ sức khỏe con người làm trung
                  tâm”.
                </Typography>
                <Typography
                  sx={{
                    color: "#e4a812",
                    fontSize: "48px",
                    fontWeight: "bold",
                  }}
                >
                  Tinh túy từ thiên nhiên
                </Typography>
              </Box>

              <Box sx={{ position: "absolute", top: "70%", left: "45%" }}>
                <img
                  src="https://launamgiakhanh.vn/storage/upload_image/images/Frame%201835.png"
                  alt="error"
                  style={{ width: "100%" }}
                />
              </Box>
            </Box>
          </Box>

          <Typography className={classes.textContent}>
            Qua nhiều năm phát triển, Lẩu nấm Gia Khánh đã dần dần khẳng định
            được vị thế của mình , đối với từng sản phẩm của Lẩu nấm Gia khánh,
            mỗi một món ăn là sự tinh túy chắt lọc qua thời gian từ những ngày
            đầu thành lập.
          </Typography>

          <Typography className={classes.textContent}>
            Nhà hàng chúng tôi luôn hướng tới những nguyên liệu có giá trị thiên
            nhiên, có lợi cho sức khỏe của từng thực khách khi đến thưởng thức
            lẩu nấm tại Lẩu Nấm Gia Khánh. Giờ đây để Lẩu Nấm Gia Khánh đến gần
            hơn với cộng đồng thực khách, Nhà hàng chúng tôi không ngừng mở rộng
            thêm hệ thống trên địa bàn Hà Nội cũng như các vùng lân cận. Với
            mong muốn mang sản phẩm tới từng thực khách với giá không đổi, giao
            hàng tận nơi không tính thêm phí phục vụ hay bất kỳ loại phí nào
            khác.
          </Typography>

          <Typography className={classes.textContent}>
            Hãy để sản phẩm của Lẩu Nấm Gia Khánh đem đến sức khỏe, niềm vui và
            sự nhiệt tình trong từng bữa ăn cho thực khách.Chúng tôi cam kết
            luôn đồng hành cùng thực khách trong từng món ăn về giá trị dinh
            dưỡng, chất lượng và phong cách phục vụ. Với không gian kiến trúc
            mở, lấy thiên nhiên làm nền tảng, luôn thay đổi tạo cảm giác lạ và
            mới mẻ cho thực khách.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
``;
export default AboutDetail;
