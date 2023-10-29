export default function Table() {
    const data = [
      {
        id: 1,
        name: "Cy Ganderton",
        job: "Quality Control Specialist",
        color: "Blue",
        link: "https://www.tesla.com",
      },
      {
        id: 2,
        name: "Hart Hagerty",
        job: "Desktop Support Technician",
        color: "Purple",
        link: "https://www.google.com",
      },
      {
        id: 3,
        name: "Brice Swyre",
        job: "Tax Accountant",
        color: "Red",
        link: "https://www.microsoft.com",
      },
      {
        id: 4,
        name: "Lena Kuehnel",
        job: "Software Engineer",
        color: "Green",
        link: "https://www.apple.com",
      },
      {
        id: 5,
        name: "Maggie Mcgillivray",
        job: "Marketing Manager",
        color: "Magenta",
        link: "https://www.amazon.com",
      },
      {
        id: 6,
        name: "Landon Mccarthy",
        job: "Sales Representative",
        color: "Carnellian",
        link: "https://www.facebook.com",
      },
    ];
  
    return (
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover">
                  <th>
                    <a href={item.link}>{item.id}</a>
                  </th>
                  <td>
                    <a href={item.link}>{item.name}</a>
                  </td>
                  <td>
                    <a href={item.link}>{item.job}</a>
                  </td>
                  <td>
                    <a href={item.link}>{item.color}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }