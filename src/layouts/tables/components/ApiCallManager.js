import { useMemo, useState } from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import DataTable from "examples/Tables/DataTable";

import { useApi } from "context/ApiContext";

function ApiCallManager() {
  const { apiCalls, addApiCall, baseUrl, apiToken } = useApi();
  const [formValues, setFormValues] = useState({
    name: "",
    method: "GET",
    path: "",
    filter: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValues.name || !formValues.path) return;

    addApiCall(formValues);
    setFormValues({ name: "", method: "GET", path: "", filter: "", description: "" });
  };

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name", width: "20%" },
      { Header: "Method", accessor: "method", width: "8%" },
      { Header: "Path", accessor: "path", width: "30%" },
      { Header: "Filter / Params", accessor: "filter", width: "20%" },
      { Header: "Description", accessor: "description" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      apiCalls.map((call) => ({
        name: call.name,
        method: call.method,
        path: call.path,
        filter: call.filter || "—",
        description: call.description || "—",
      })),
    [apiCalls]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              Okta connection
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <MDTypography variant="caption" color="text" display="block" mb={1}>
              Base URL
            </MDTypography>
            <MDTypography variant="body2" fontWeight="medium" mb={2}>
              {baseUrl || "Not set"}
            </MDTypography>
            <MDTypography variant="caption" color="text" display="block" mb={1}>
              API Token
            </MDTypography>
            <MDTypography variant="body2" fontWeight="medium" color={apiToken ? "success" : "text"}>
              {apiToken ? "Token ready to use for API calls" : "Not set"}
            </MDTypography>
          </MDBox>
          <Divider />
          <MDBox p={3} component="form" role="form" onSubmit={handleSubmit}>
            <MDTypography variant="h6" gutterBottom>
              Add an API call template
            </MDTypography>
            <MDBox mb={2}>
              <MDInput
                name="name"
                label="Friendly name"
                value={formValues.name}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <FormControl fullWidth>
                <InputLabel id="method-select-label">Method</InputLabel>
                <Select
                  labelId="method-select-label"
                  name="method"
                  value={formValues.method}
                  label="Method"
                  onChange={handleChange}
                >
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                  <MenuItem value="PUT">PUT</MenuItem>
                  <MenuItem value="PATCH">PATCH</MenuItem>
                  <MenuItem value="DELETE">DELETE</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="path"
                label="Path (relative to base URL)"
                value={formValues.path}
                onChange={handleChange}
                fullWidth
                placeholder="/api/v1/users"
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="filter"
                label="Query string / filter"
                value={formValues.filter}
                onChange={handleChange}
                fullWidth
                placeholder="?limit=200"
              />
            </MDBox>
            <MDBox mb={3}>
              <MDInput
                name="description"
                label="Description"
                value={formValues.description}
                onChange={handleChange}
                multiline
                rows={2}
                fullWidth
                placeholder="What does this call retrieve?"
              />
            </MDBox>
            <MDButton type="submit" variant="gradient" color="info" fullWidth>
              Add API call
            </MDButton>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12} md={7}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              API call templates
            </MDTypography>
          </MDBox>
          <MDBox pt={3} px={2} pb={2}>
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ApiCallManager;
