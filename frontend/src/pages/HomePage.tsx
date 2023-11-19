import SearchBar from "../components/SearchBar";
import Table from "../components/table";
import NavBar from "../components/NavBar";
import TickerInput from "../components/TickerInput";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <Table />
      <TickerInput />
    </div >
  );
}
