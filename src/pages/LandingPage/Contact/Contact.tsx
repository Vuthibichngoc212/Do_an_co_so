import { Box, Grid, Typography, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import useStyles from "./Contact.style";
import { useSettingUserQuery } from "../../../redux/api/api.caller";

const Contact = () => {
  const classes = useStyles();
  const { data } = useSettingUserQuery();

  if (!data || !data.data) {
    return <Typography>No data available.</Typography>;
  }

  return (
    <Box id="contact-section" sx={{ textAlign: "center", my: 6 }}>
      <Typography
        variant="h4"
        sx={{ mb: 6, fontWeight: "bold", color: "#e91a22" }}
      >
        LẨU NẤM GIA KHÁNH
      </Typography>

      <Box sx={{ margin: "0px 80px" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={3}>
            <IconButton className={classes.iconButton}>
              <LocationOnIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title}>
              Trụ sở chính
            </Typography>
            <Typography variant="body1" sx={{ color: "#0e0202" }}>
              {data.data.address || []}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <IconButton className={classes.iconButton}>
              <PhoneIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title}>
              Điện thoại
            </Typography>
            <Typography variant="body1" sx={{ color: "#0e0202" }}>
              {data.data.phone}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <IconButton className={classes.iconButton}>
              <EmailIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title}>
              Email
            </Typography>
            <Typography variant="body1" sx={{ color: "#0e0202" }}>
              {data.data.email}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <IconButton className={classes.iconButton}>
              <LanguageIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title}>
              Website
            </Typography>
            <Typography variant="body1" sx={{ color: "#0e0202" }}>
              https://launamgiakhanh.vn/
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Contact;
