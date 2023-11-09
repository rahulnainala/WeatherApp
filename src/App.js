import { useState } from "react";
import "./App.css";
import Body from "./components/Body";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app-container">
        <SearchBar onSearch={handleSearch} />

        <Body searchQuery={searchQuery} />

        <Footer />
    </div>
  );
};

export default App;
