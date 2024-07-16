import { useOutlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";

function ProtectedLayout() {
  const outlet = useOutlet();

  return (
    <Box>
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <Stack sx={{}}>{outlet}</Stack>
      </Stack>
    </Box>
  );
}

export default ProtectedLayout;
