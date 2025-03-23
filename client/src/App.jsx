import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // Add useEffect
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRouter from "./components/PrivateRouter";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Intro from "./pages/Intro";

export default function App() {
  const [isIntroEnded, setIntroEnded] = useState(false);

  // Use useEffect for the intro timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroEnded(true); // End the intro after 3.5 seconds
    }, 1000); // Adjust this duration to match your intro animation

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <BrowserRouter>
      {/* Conditionally render the Header */}
      {isIntroEnded && <Header />}

      {/* Render Intro or Routes based on isIntroEnded */}
      {isIntroEnded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:listingId" element={<Listing />} />

          <Route element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
          </Route>
        </Routes>
      ) : (
        <Intro />
      )}
    </BrowserRouter>
  );
}
