import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DoctorsFilterContext } from "./index";

const DoctorFilterForm: React.FC = () => {
  const { filter, dispatch } = useContext(DoctorsFilterContext);
  const [localFilter, setLocalFilter] = useState(filter);

  useEffect(() => {
    setLocalFilter(filter);
  }, [filter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilter((prev) => ({ ...prev, [name]: value }));
  };

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const cleanAndFormatFilter = (filterObj: typeof localFilter) => {
    const cleaned: Record<string, string> = {};
    Object.entries(filterObj).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        cleaned[key] = capitalizeFirstLetter(value.trim());
      }
    });
    return cleaned;
  };

  const handleSearch = () => {
    const formattedFilter = cleanAndFormatFilter(localFilter);
    if (Object.keys(formattedFilter).length === 0) {
      dispatch({ type: "SET_FILTER", payload: {} });
    } else {
      dispatch({ type: "SET_FILTER", payload: formattedFilter });
    }
  };

  return (
    <Card sx={{ mb: 3, p: 2 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography variant="h6" fontWeight="bold">
            FIND A DOCTOR
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Insert the information of your collagues
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <TextField
            label="Name"
            name="name"
            size="small"
            variant="outlined"
            value={localFilter.name || ""}
            onChange={handleChange}
            sx={{ flexGrow: 1 }}
          />
          <TextField
            label="Surname"
            name="surname"
            size="small"
            variant="outlined"
            value={localFilter.surname || ""}
            onChange={handleChange}
            sx={{ flexGrow: 1 }}
          />
          <TextField
            label="Profession"
            name="profession"
            size="small"
            variant="outlined"
            value={localFilter.profession || ""}
            onChange={handleChange}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="outlined"
            endIcon={<SearchIcon />}
            color="primary"
            onClick={handleSearch}
            sx={{ minWidth: 100 }}
          >
            Search
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoctorFilterForm;
