import PersonCard from '../components/PersonCard';

interface Person {
  name: string;
  image: string;
  role: string;
  email: string;
  linkedin: string;
  website: string;
}

export default function Contact() {
  const people: Person[] = [
    // Placeholder data
    { name: "Diego Marques", image: "/Headshots/Diego.jpg", role: "Software Engineer", email: "dlm352@cornell.edu", linkedin: "https://www.linkedin.com/in/dmarques/", website: "https://diegomarques.netlify.app/" },
    { name: "Emna Sadkaoui", image: "/Headshots/EmnaSadkaoui.png", role: "Project Manager", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Bhuwan Bhattarai", image: "/Headshots/BhuwanBhattarai.png", role: "Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Aneesh Naresh", image: "/Headshots/black.png", role: "Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Sweksha Mehta", image: "/Headshots/black.png", role: "Project Manager", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Kevin Biliguun", image: "/Headshots/black.png", role: "Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Kevin Hu", image: "/Headshots/black.png", role: "Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Eddie Ramirez", image: "/Headshots/black.png", role: "Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Neil Gidwani", image: "/Headshots/black.png", role: "Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Goretti Muriithi", image: "/Headshots/black.png", role: "Business Analyst", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Nikhil Berry", image: "/Headshots/black.png", role: "Business Analyst", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    // Add more entries as needed
  ];

  return (
    <div className="contact" style={{ padding: '20px' }}>
      <div style={{ paddingBottom: '20px' }}> <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">Contact</h1> </div>
      <section>
        <h2></h2>
        <div className="people-grid">
          {people.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>
      </section>
    </div>
  );
}
