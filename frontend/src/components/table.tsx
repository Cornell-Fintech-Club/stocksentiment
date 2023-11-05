export default function Table() {
    const data = [ // Scalable table data
      {
        id: 1,
        ticker: "AAPL",
        company: "Apple Inc.",
        price: 148.48,
        change: -0.23,
        changePercent: -0.15,
        sentiment: 0.75,
        volume: 56371661,
        link: "https://www.apple.com",
      },
      {
        id: 2,
        ticker: "GOOG",
        company: "Alphabet Inc.",
        price: 2676.59,
        change: 5.67,
        changePercent: 0.21,
        sentiment: 0.82,
        volume: 1079863,
        link: "https://www.google.com",
      },
      {
        id: 3,
        ticker: "MSFT",
        company: "Microsoft Corporation",
        price: 305.76,
        change: 0.12,
        changePercent: 0.04,
        sentiment: 0.68,
        volume: 17529622,
        link: "https://www.microsoft.com",
      },
      {
        id: 4,
        ticker: "AMZN",
        company: "Amazon.com, Inc.",
        price: 3346.83,
        change: -9.53,
        changePercent: -0.28,
        sentiment: 0.91,
        volume: 2452626,
        link: "https://www.amazon.com",
      },
      {
        id: 5,
        ticker: "TSLA",
        company: "Tesla, Inc.",
        price: 687.20,
        change: -1.80,
        changePercent: -0.26,
        sentiment: 0.62,
        volume: 13083117,
        link: "https://www.tesla.com",
      },
    ];
  
    return ( 
      <div>
        <div style={{ maxWidth: '80%', margin: '0 auto' }}>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>  {/* Column names */}
              <tr> 
                <th></th> 
                <th>Ticker Symbol</th>
                <th>Company Name</th>
                <th>Last Price</th>
                <th>Change</th>
                <th>Change %</th>
                <th>Sentiment Score</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody> {/* table data */}
              {data.map((item) => ( 
                <tr key={item.id} className="hover">
                  <th>
                    <a href={item.link}>{item.id}</a>
                  </th>
                  <td>
                    <a href={item.link}>{item.ticker}</a>
                  </td>
                  <td>
                    <a href={item.link}>{item.company}</a>
                  </td>
                  <td>
                    <a href={item.link}>{item.price}</a>
                  </td>
                  <td>
                    <a href={item.link}>{item.change}</a>
                  </td>
                  <td>
                    <a href={item.link}>{item.changePercent}%</a>
                  </td>
                  <td>
                    <a href={item.link}>{item.sentiment}</a>
                  </td>
                  <td>
                    <a href={item.link}>{item.volume}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
  }