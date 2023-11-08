import SearchBar from "../components/SearchBar";
import Table from "../components/table";
import NavBar from "../components/NavBar";
import StockNews from "../components/StockNews";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <Table />
      <StockNews />
    </div >
  );
}
