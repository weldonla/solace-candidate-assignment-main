"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./api/advocates/model";

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

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left", verticalAlign: "top" }}>First Name</th>
            <th style={{ textAlign: "left", verticalAlign: "top" }}>Last Name</th>
            <th style={{ textAlign: "left", verticalAlign: "top" }}>City</th>
            <th style={{ textAlign: "left", verticalAlign: "top" }}>Degree</th>
            <th style={{ textAlign: "left", verticalAlign: "top" }}>Specialties</th>
            <th style={{ textAlign: "left", verticalAlign: "top" }}>Years of Experience</th>
            <th style={{ textAlign: "left", verticalAlign: "top" }}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.phoneNumber}>
                <td style={{ textAlign: "left", verticalAlign: "top" }}>{advocate.firstName}</td>
                <td style={{ textAlign: "left", verticalAlign: "top" }}>{advocate.lastName}</td>
                <td style={{ textAlign: "left", verticalAlign: "top" }}>{advocate.city}</td>
                <td style={{ textAlign: "left", verticalAlign: "top" }}>{advocate.degree}</td>
                <td style={{ textAlign: "left", verticalAlign: "top" }}>
                  {advocate.specialties.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td style={{ textAlign: "left", verticalAlign: "top" }}>{advocate.yearsOfExperience}</td>
                <td style={{ textAlign: "left", verticalAlign: "top" }}>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
