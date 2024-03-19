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
    { name: "Name", image: "/Headshots/empty-profile-picture.jpg", role: "Financial Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Name", image: "/Headshots/empty-profile-picture.jpg", role: "Financial Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Name", image: "/Headshots/empty-profile-picture.jpg", role: "Financial Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Name", image: "/Headshots/empty-profile-picture.jpg", role: "Financial Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Name", image: "/Headshots/empty-profile-picture.jpg", role: "Financial Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    { name: "Name", image: "/Headshots/empty-profile-picture.jpg", role: "Financial Software Engineer", email: "empty@example.com", linkedin: "https://www.google.com/", website: "https://www.google.com/" },
    // Add more entries as needed
  ];

  return (
    <div className="contact" style={{ padding: '20px' }}>
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">Contact</h1>
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
