import SearchBar from "../components/SearchBar";
import Table from "../components/table";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-5xl font-semibold px-4 py-2">CFT Stock Sentiment</h1>
      <SearchBar />
      <Table />
          
    </div >
  );
}