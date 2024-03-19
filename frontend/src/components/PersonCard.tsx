interface Person {
  name: string;
  image: string;
  role: string; 
  email: string;
  linkedin: string;
  website: string;
}

export default function PersonCard({ person }: { person: Person }) {
  return (
    <div className="person-card">
      <img src={person.image} alt={person.name} />
      <div className="person-details">
        <p>{person.name}</p>
        <p><a href={`mailto:${person.email}`}>Email</a></p>
        <p><a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        <p><a href={person.website} target="_blank" rel="noopener noreferrer">Website</a></p>
      </div>
    </div>
  );
}
