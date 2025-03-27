import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";


const articles = [

     {
     id: 1,
     title: "Understanding the difference between grid-template and grid-auto",
     date: "Oct 09, 2018",
     content: "With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. Specifically the difference between grid-template-rows/columns and grid-auto-rows/columns.",
     },
     
     {
     id: 2,
     title: "Recreating the GitHub Contribution Graph with CSS Grid Layout",
     date: "Nov 15, 2019",
     content:"A deep dive into how the GitHub contribution graph can be recreated using CSS Grid. cdd cdd cdd",
     },
     
     ];

const highlightText = (text, query, countOccurrences) => {

     if (!query) return text;
     
     const regex = new RegExp(`(${query})`, "gi");
     
     const parts = text.split(regex);
     
     if (countOccurrences) {
     
     return parts.filter((part) => part.toLowerCase() === query.toLowerCase()).length;
     
     }
     
     return parts.map((part, index) =>
     
     part.toLowerCase() === query.toLowerCase() ? (
     
     <span key={index} style={{ backgroundColor: "yellow" }}>{part}</span>
     
     ) : (
     
     part
     
     )
     
     );
     
     };
const SearchApp = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const countOccurrences = () => {
    let totalCount = 0;
    articles.forEach((article) => {
      totalCount += highlightText(article.title, searchQuery, true);
      totalCount += highlightText(article.content, searchQuery, true);
    });
    return totalCount;
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto", 
        width: "100%", 
        boxSizing: "border-box", 
      }}
    >
      <h2>Search</h2>

      <IconField iconPosition="right">
        <InputText
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type to search..."
          className="p-inputtext-lg rounded-none"
          style={{
            width: "100%",
            background: "white",
            color: "black",
            height: "35px",
            borderColor: "black",
            borderRadius: "none",
            boxShadow: "none",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.boxShadow = "none")}
        />
        <InputIcon
          className="pi pi-times text-center"
          onClick={(e) => {
            e.stopPropagation();
            setSearchQuery("");
          }}
          style={{
            cursor: "pointer",
            fontSize: "10px",
            backgroundColor: "gray",
            color: "white",
            borderRadius: "1rem",
            padding: "5px",
          }}
        />
      </IconField>

      <p>
        {searchQuery && <strong>{countOccurrences()}</strong>} <strong>Posts</strong> were found.
      </p>
      {articles.map((article) => (
        <div key={article.id} style={{ marginBottom: "20px" }}>
          <h3>{highlightText(article.title, searchQuery)}</h3>
          <em>{article.date}</em>
          <p>{highlightText(article.content, searchQuery)}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchApp;