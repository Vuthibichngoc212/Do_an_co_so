import { Box, Typography, Card, CardMedia, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useStyles from "./SpecialMenu.style";
import {
  useFilterMenuQuery,
  useGetMenuQuery,
} from "../../../redux/api/api.caller";
import LazyLoading from "../../../components/LazyLoading";

const SpecialMenu = () => {
  const classes = useStyles();
  const {
    data: listMenu,
    refetch: refetchListMenu,
    isLoading: isListLoading,
  } = useGetMenuQuery();

  const [category, setCategory] = useState<string | null>(null);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  const {
    data: filterMenu,
    refetch: refetchFilterMenu,
    isFetching: isFilterFetching,
  } = useFilterMenuQuery({ category: category as string }, { skip: !category });

  useEffect(() => {
    if (category) {
      refetchFilterMenu();
      setShowAllItems(false);
    }
  }, [category, refetchFilterMenu]);

  const handleCategoryClick = (clickedCategory: string) => {
    setCategory(clickedCategory === category ? null : clickedCategory);
    setShowAllItems(false);
  };

  const handleShowAll = () => {
    setCategory(null);
    refetchListMenu();
    setShowAllItems(false);
  };

  const handleLoadMore = () => {
    setShowAllItems(true);
  };

  if (isListLoading || (category && isFilterFetching)) {
    return <LazyLoading />;
  }

  if (!listMenu || !listMenu.data) {
    return <Typography>No data available.</Typography>;
  }

  const allCategories = listMenu.data.menuItemResponseList.map(
    (item) => item.category
  );
  const uniqueCategories = [...new Set(allCategories)];

  const currentMenu = category
    ? filterMenu?.data?.menuItemResponseList
    : listMenu.data.menuItemResponseList;
  const displayedItems = currentMenu?.slice(0, showAllItems ? undefined : 10);

  return (
    <Box id="special-menu" sx={{ marginTop: "50px" }}>
      <Typography variant="h4" className={classes.title}>
        Thực đơn
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 9 }}>
        <Button
          variant="contained"
          onClick={handleShowAll}
          className={classes.button}
        >
          All
        </Button>
        {uniqueCategories.map((category) => (
          <Button
            key={category}
            variant="contained"
            onClick={() => handleCategoryClick(category)}
            className={classes.button}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2} sx={{ px: 16 }}>
        {displayedItems?.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={item.id}
            className={classes.image}
          >
            <Card sx={{ marginBottom: "30px" }}>
              <CardMedia
                component="img"
                height="300"
                image={item.image}
                alt={item.itemName}
              />
              <Box>
                <Typography variant="h6" sx={{ textAlign: "center", p: 1 }}>
                  {item.itemName}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    p: 1,
                    color: "red",
                  }}
                >
                  ${item.price}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {currentMenu && currentMenu.length > 10 && !showAllItems && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            className={classes.button}
          >
            Xem thêm
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SpecialMenu;
