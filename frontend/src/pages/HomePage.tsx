import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/table";
import TickerInput from "../components/TickerInput";
import { firestore } from '../firebase'
import { collection, getDocs } from '@firebase/firestore'

export default function HomePage() {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCollection);
        usersSnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {/*<SearchBar />*/}
      <Table />
    </div >
  );
}
