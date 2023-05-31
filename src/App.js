import "./App.css";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <section className="App">
      <Navbar />
      <Home />
      <Footer />
    </section>
  );
}

export default App;
