export default function Profile() {
  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <p>This is the profile page of the user where personal details and trading activities are displayed.</p>
      <div>
        <h2>Personal Details</h2>
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <p>Location: New York, USA</p>
      </div>
      <div>
        <h2>Activities</h2>
        <ul>
          <li>Bought 10 shares of AAPL</li>
          <li>Sold 5 shares of TSLA </li>
        </ul>
      </div>
    </div>
  );
}
