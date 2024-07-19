import * as React from "react";
import { Box, Typography, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import useStyles from "./Footer.style";
import { Link as ScrollLink } from "react-scroll";
import logoRes from "../../../assets/logoRes.png";
import { useSettingUserQuery } from "../../../redux/api/api.caller";

const Footer: React.FC = () => {
  const classes = useStyles();
  const { data } = useSettingUserQuery();

  if (!data || !data.data) {
    return <Typography>No data available.</Typography>;
  }

  return (
    <Box className={classes.container}>
      <Box sx={{ margin: "0px 140px" }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" className={classes.colTitle}>
              Thông tin liên hệ
            </Typography>
            <Typography variant="body2" className={classes.contentColTitle1}>
              <EmailIcon sx={{ marginRight: "8px" }} />
              {data.data.email}
            </Typography>
            <Typography variant="body2" className={classes.contentColTitle1}>
              <LanguageIcon sx={{ marginRight: "8px" }} />
              Website: www.nhahang5sao.vn
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box className={classes.col2Box}>
              <Typography className={classes.col2Title}>Hotline</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#e9b941",
                  fontSize: "20px",
                }}
              >
                {data.data.phoneNumber}
              </Typography>
            </Box>

            <Box className={classes.col2Box}>
              <Typography className={classes.col2Title}>Giờ mở cửa</Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                10:00 - 22:00
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
            <Typography variant="h6" className={classes.colTitle}>
              Liên kết nhanh
            </Typography>
            <Box>
              <ScrollLink to="contact-section" smooth={true} duration={500}>
                <Typography sx={{ marginBottom: "16px", cursor: "pointer" }}>
                  Liên hệ
                </Typography>
              </ScrollLink>
              <ScrollLink to="special-menu" smooth={true} duration={500}>
                <Typography sx={{ marginBottom: "16px", cursor: "pointer" }}>
                  Thực đơn
                </Typography>
              </ScrollLink>
              <Typography sx={{ marginBottom: "16px" }}>
                Câu hỏi thường gặp
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
