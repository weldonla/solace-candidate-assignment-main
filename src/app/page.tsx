"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchAdvocates = async (currentPage: number, currentSearchTerm: string) => {
    console.log("fetching advocates...");
    const response = await fetch(
      `/api/advocates?page=${currentPage}&limit=${limit}&search=${currentSearchTerm}`
    );
    const jsonResponse = await response.json();
    const advocatesInstances = jsonResponse.data.map(
      (data: Partial<Advocate>) => new Advocate(data)
    );
    setAdvocates(advocatesInstances);
    setTotal(jsonResponse.total);
    setPage(jsonResponse.page);
    setLimit(jsonResponse.limit);
  };

  useEffect(() => {
    fetchAdvocates(page, searchTerm);
  }, [page, limit, searchTerm]);

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setPage(1); // Reset to first page on new search

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
    }, 300); // Debounce for 300ms
  }, []);

  const handleResetSearch = () => {
    setSearchTerm("");
    setPage(1);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const totalPages = Math.ceil(total / limit);

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
              onChange={handleSearchChange}
              sx={{ minWidth: { xs: "100%", sm: "300px" } }}
            />
            <Button variant="contained" color="secondary" onClick={handleResetSearch} sx={{ color: "black" }}>
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
              {advocates.map((advocate: Advocate) => (
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
                    {advocate.specialties.map((s: string) => (
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

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            disabled={page === 1}
            sx={{ color: "black" }}
          >
            Previous
          </Button>
          <Typography variant="body1" sx={{ color: "text.primary", alignSelf: "center" }}>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={page === totalPages}
            sx={{ color: "black" }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
