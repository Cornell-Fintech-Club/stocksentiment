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
  <main className="person-card-main">
    <div className="person-card">
      <img src={person.image} alt={person.name} />
      <div className="person-details">
        <div className="person-header">
          <h2>{person.name}</h2>
          <p>{person.role}</p>
        </div>
        <p className="person-links">
          <a href={`mailto:${person.email}`}>Email</a> <br />
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> <br />
          <a href={person.website} target="_blank" rel="noopener noreferrer">Website</a> <br />
        </p>
      </div>
    </div>
  </main>
  );
}
