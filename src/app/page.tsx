"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./api/advocates/model";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from "@mui/material";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        const advocatesInstances = jsonResponse.data.map((data: Partial<Advocate>) => new Advocate(data));
        setAdvocates(advocatesInstances);
        setFilteredAdvocates(advocatesInstances);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchTerm = e.target.value;
    setSearchTerm(currentSearchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        advocate.specialties.some(s => s.toLowerCase().includes(currentSearchTerm.toLowerCase())) ||
        advocate.yearsOfExperience.toString().includes(currentSearchTerm) ||
        advocate.phoneNumber.toString().includes(currentSearchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const resetSearch = () => {
    console.log(advocates);
    setSearchTerm(""); // Clear the search term
    setFilteredAdvocates(advocates);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "background.default", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontFamily: '"Lato", sans-serif', color: "text.secondary" }}
          >
            Solace Advocates
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: "text.primary" }}>
            Search Advocates
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center", mb: 2 }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={onChange}
              sx={{ minWidth: { xs: "100%", sm: "300px" } }}
            />
            <Button variant="contained" color="secondary" onClick={resetSearch} sx={{ color: "black" }}>
              Reset Search
            </Button>
          </Box>
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            Searching for: <Typography component="span" sx={{ fontWeight: "bold" }}>{searchTerm}</Typography>
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="advocates table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "text.secondary", fontFamily: '"Lato", sans-serif' }}>First Name</TableCell>
                <TableCell sx={{ color: "text.secondary", fontFamily: '"Lato", sans-serif' }}>Last Name</TableCell>
                <TableCell sx={{ color: "text.secondary", fontFamily: '"Lato", sans-serif' }}>City</TableCell>
                <TableCell sx={{ color: "text.secondary", fontFamily: '"Lato", sans-serif' }}>Degree</TableCell>
                <TableCell sx={{ color: "text.secondary", fontFamily: '"Lato", sans-serif' }}>Specialties</TableCell>
                <TableCell sx={{ color: "text.secondary", fontFamily: '"Lato", sans-serif' }}>Years of Experience</TableCell>
                <TableCell sx={{ color: "text.secondary", fontFamily: '"Lato", sans-serif' }}>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAdvocates.map((advocate) => (
                <TableRow
                  key={advocate.phoneNumber}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, backgroundColor: "background.paper" }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "text.primary", fontFamily: '"Lato", sans-serif' }}>
                    {advocate.firstName}
                  </TableCell>
                  <TableCell sx={{ color: "text.primary", fontFamily: '"Lato", sans-serif' }}>{advocate.lastName}</TableCell>
                  <TableCell sx={{ color: "text.primary", fontFamily: '"Lato", sans-serif' }}>{advocate.city}</TableCell>
                  <TableCell sx={{ color: "text.primary", fontFamily: '"Lato", sans-serif' }}>{advocate.degree}</TableCell>
                  <TableCell sx={{ color: "text.primary", fontFamily: '"Lato", sans-serif' }}>
                    {advocate.specialties.map((s) => (
                      <Typography key={s} variant="body2" sx={{ fontFamily: '"Lato", sans-serif' }}>{s}</Typography>
                    ))}
                  </TableCell>
                  <TableCell sx={{ color: "text.primary", fontFamily: '"Lato", sans-serif' }}>{advocate.yearsOfExperience}</TableCell>
                  <TableCell sx={{ color: "text.primary", fontFamily: '"Lato", sans-serif' }}>{advocate.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
