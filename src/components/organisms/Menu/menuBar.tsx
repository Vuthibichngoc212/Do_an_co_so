import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import logoRes from "../../../assets/logoRes.png";
import { scroller, Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";

const pages = [
  { name: "Giới thiệu", to: "about-section" },
  { name: "Thực đơn đặc biệt", to: "special-menu" },
  { name: "Liên hệ", to: "contact-section" },
];

function MenuBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = React.useState<string>("");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageClick = (page: string) => {
    setCurrentPage(page);
    handleCloseNavMenu();

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: page } });
    } else {
      scroller.scrollTo(page, {
        smooth: true,
        duration: 500,
        offset: -100,
      });
    }
  };

  React.useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 500,
        offset: -100,
      });
    } else {
      setCurrentPage("");
    }
  }, [location]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppBar sx={{ backgroundColor: "#f6f2ed" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100px",
        }}
      >
        <Box
          sx={{ marginLeft: "50px", display: { xs: "none", md: "block" } }}
          onClick={() => navigate("/")}
        >
          <img
            src={logoRes}
            alt="logo"
            style={{ width: "100px", height: "auto" }}
          />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={() => handlePageClick(page.to)}
              >
                <ScrollLink to={page.to} smooth={true} duration={500}>
                  <Typography textAlign="center">{page.name}</Typography>
                </ScrollLink>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          sx={{ marginLeft: "50px", display: { xs: "block", md: "none" } }}
          onClick={() => navigate("/")}
        >
          <img
            src={logoRes}
            alt="logo"
            style={{ width: "100px", height: "auto" }}
          />
        </Box>

        <Box
          sx={{
            marginRight: "5rem",
            flexGrow: 1,
            display: { xs: "none", md: "flex", justifyContent: "flex-end" },
          }}
        >
          {pages.map((page) => (
            <ScrollLink
              key={page.name}
              to={page.to}
              smooth={true}
              duration={500}
              style={{
                marginRight: "2rem",
                cursor: "pointer",
              }}
            >
              <Typography
                onClick={() => handlePageClick(page.to)}
                sx={{
                  my: 2,
                  color: currentPage === page.to ? "#B89574" : "#272727",
                  fontSize: "18px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  "&:hover": {
                    color: "#B89574",
                  },
                }}
              >
                {page.name}
              </Typography>
            </ScrollLink>
          ))}
        </Box>
      </Box>
    </AppBar>
  );
}

export default MenuBar;
