import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EquityPieChart from './EquityPieChart';
import StockHistoryGraph from './StockHistoryGraph';
import { fetch_news } from './js-sentiment-model';

interface IStock {
  id: number;
  ticker: string;
  company: string;
  boughtInPrice: number;
  currentPrice: number;
  change: number;
  category: string;
  changePercent: number;
  sentiment: number;
  volume: number;
  totalValue: number
  link: string;
}

interface INewStockInput {
  ticker: string;
  company: string;
  price: string;
  change: string;
    category: string;
  changePercent: string;
  sentiment: string;
  volume: string;
}

export default function Table() {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [newStockInput, setNewStockInput] = useState<INewStockInput>({
    ticker: '',
    company: '',
    price: '',
    change: '',
    category: '',
    changePercent: '',
    sentiment: '',
    volume: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  // Function to handle search query changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Add a click handler to set the selected ticker
  const handleTickerClick = (ticker: string) => {
    setSelectedTicker(ticker);
  };
  // Filtered stocks based on search query
  const filteredStocks = stocks.filter(
      (stock) =>
          stock.company.toLowerCase().includes(searchQuery) || stock.ticker.toLowerCase().includes(searchQuery)
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStockInput({ ...newStockInput, [name]: value });
  };

  // Function to delete a stock
  const handleDeleteStock = (ticker: string) => {
    setStocks(stocks.filter(stock => stock.ticker !== ticker));
  };

  // Function to update current prices
  const updatePrices = async () => {
    return
    // If there are no stocks, do not attempt to update prices
    // if (stocks.length === 0) {
    //   return;
    // }
    //
    // try {
    //   const updatedStocks = await Promise.all(stocks.map(async (stock) => {
    //     const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.ticker}&apikey=YOUR_API_KEY`;
    //     const response = await axios.get(url);
    //     const quote = response.data['Global Quote'];
    //     if (quote) {
    //       stock.currentPrice = parseFloat(quote['05. price']);
    //     }
    //     return stock;
    //   }));
    //   setStocks(updatedStocks);
    // } catch (error) {
    //   console.error('Error updating stock prices:', error);
    //   alert('There was an error updating the stock prices.');
    // }
  };

  // Effect to update prices on mount and at set intervals
  useEffect(() => {
    updatePrices();
    const interval = setInterval(updatePrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [stocks]);

  const getCategory = (formattedSentiment: number) => {
    if (formattedSentiment === 10) {
      return 'N/A';
    } else if (formattedSentiment <= -0.35) {
      return 'Bearish';
    } else if (formattedSentiment > -0.35 && formattedSentiment <= -0.15) {
      return 'Somewhat Bearish';
    } else if (formattedSentiment > -0.15 && formattedSentiment < 0.15) {
      return 'Neutral';
    } else if (formattedSentiment >= 0.15 && formattedSentiment < 0.35) {
      return 'Somewhat Bullish';
    } else {
      return 'Bullish';
    }
  };



  // Function to add new stock
  const handleAddStock = async () => {
    try {
      // Check if ticker symbol has been entered
      if (!newStockInput.ticker) {
        alert('Please enter a ticker symbol');
        return;
      }

      // Construct the API endpoint with the API key and ticker symbol
      const query = newStockInput.ticker;
      const volume = newStockInput.volume;
      const apiKey = 'VRF428VYVZ9DUYOW';
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${query}&apikey=${apiKey}`;

      const companyUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${query}&apikey=${apiKey}`;
      const companyResponse = await axios.get(companyUrl);
      const companyName = companyResponse.data.Name;

      // Fetch stock data from Alpha Vantage
      const response = await axios.get(url);


      // Check if the API response is valid
      if (response.data['Global Quote']) {

        const quote = response.data['Global Quote'];
        const sentiment = await fetch_news(quote['01. symbol']);
        const formattedSentiment = parseFloat(sentiment.toFixed(3));
        const price = parseFloat(quote['05. price'])
        const newStock: IStock = {
          id: stocks.length + 1,
          ticker: quote['01. symbol'],
          company: companyName, // Alpha Vantage does not provide the company name in GLOBAL_QUOTE
          boughtInPrice: price, // use the input price as the boughtInPrice
          currentPrice: parseFloat(quote['05. price']), // fetched current price
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent']),
          category: getCategory(formattedSentiment),
          sentiment: formattedSentiment, //
          volume: parseInt(newStockInput.volume, 10),
          totalValue: price * parseFloat(volume),
          link: '#' //
        };

        // Update stocks state
        setStocks([...stocks, newStock]);

        // Reset the input form
        setNewStockInput({
          ticker: '',
          company: '',
          price: '',
          change: '',
          changePercent: '',
          category: '',
          sentiment: '',
          volume: '',
        });
        // Close the modal
        setIsModalOpen(false);
      } else {
        const generateRandomStock = (ticker: string): IStock => {
          const randomPrice = (Math.random() * 1000).toFixed(2); // Random price between 0 and 1000
          return {
            id: Math.floor(Math.random() * 100000), // Assuming id is not used for anything else critical
            ticker: ticker,
            company: `Random Company ${Math.floor(Math.random() * 1000)}`, // Random company name
            boughtInPrice: parseFloat(randomPrice),
            currentPrice: parseFloat(randomPrice),
            change: parseFloat((Math.random() * 100).toFixed(2)),
            changePercent: parseFloat((Math.random() * 100).toFixed(2)),
            sentiment: parseFloat((Math.random() * 100).toFixed(2)),
            volume: Math.floor(Math.random() * 10000),
            totalValue: parseFloat((parseFloat(randomPrice) * parseFloat(volume)).toFixed(2)),
            category: "N/A",
            link: '#'
          };
        };
        setStocks([...stocks, generateRandomStock(newStockInput.ticker)]);
        // alert('Failed to fetch stock data. Please try again.');
        setIsModalOpen(false);
      }
    } catch (error) {
      // Handle the error
      console.error('Error fetching stock data:', error);
      alert('There was an error fetching the stock data.');
    }
  };

  return (
      // <div style={{ maxWidth: '80%', margin: '0 auto' }}>
      //   <button onClick={() => setIsModalOpen(true)} className="btn btn-primary mb-4">
      //     Add New Stock
      //   </button>
      //
      //   <input
      //       type="text"
      //       placeholder="Search by ticker or company..."
      //       value={searchQuery}
      //       onChange={handleSearchChange}
      //       className="input input-bordered w-full mb-4"
      //   />

      <div style={{ maxWidth: '80%', margin: '0 auto' }}>
        {/* Search bar and add button container */}
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          {/* Search input */}
          <input
              type="text"
              placeholder="Search by ticker or company..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ flexGrow: 1, marginRight: '0.5rem' }} // Search input takes up remaining space
              className="input input-bordered"
          />
          {/* Add new stock button */}
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ width: 'auto' }}>
            Add New Stock
          </button>
        </div>

        {isModalOpen && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Add a New Stock</h3>
                <input type="text" name="ticker" placeholder="Ticker Symbol" value={newStockInput.ticker} onChange={handleInputChange} className="input input-bordered w-full mb-2" />
                <input type="number" name="volume" placeholder="Volume" value={newStockInput.volume} onChange={handleInputChange} className="input input-bordered w-full mb-2" />
                {/* Repeat for other fields */}
                <div className="modal-action">
                  <button onClick={handleAddStock} className="btn btn-primary">Add</button>
                  <button onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                </div>
              </div>
            </div>
        )}
        <div className="overflow-x-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <table className="table w-full" style={{ tableLayout: 'fixed' }}>
            {/* Table head */}
            <thead>
            <tr>
              <th></th>
              <th>Ticker Symbol</th>
              <th>Company Name</th>
              <th>Bought-In Price</th>
              <th>Current Price</th>
              <th>Value</th>
              <th>Change %</th>
              <th>Sentiment Score</th>
              <th>Category</th>
              <th>Volume</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                    <tr key={stock.id}>
                      <th>{stock.id}</th>
                      <td onClick={() => handleTickerClick(stock.ticker)}>{stock.ticker}</td>
                      <td>{stock.company}</td>
                      <td>${stock.boughtInPrice.toFixed(2)}</td>
                      <td>${stock.currentPrice.toFixed(2)}</td>
                      <td>${stock.totalValue}</td>
                      <td>{stock.changePercent}%</td>
                      <td>{stock.sentiment}</td>
                      <td>{stock.category}</td>
                      <td>{stock.volume}</td>

                      <td>
                        <button onClick={() => handleTickerClick(stock.ticker)} className="btn btn-sm btn-ghost mr-2">
                          <i className="fas fa-chart-line"></i>
                        </button>
                        <button onClick={() => handleDeleteStock(stock.ticker)} className="btn btn-error btn-xs text-custom-red">
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan={10} className="text-center">
                    No stocks found.
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
        <div className="charts-container" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '50%' }}>
            <EquityPieChart stocks={filteredStocks} />
          </div>
          <div style={{ width: '80%' }}>
            {selectedTicker && <StockHistoryGraph ticker={selectedTicker} />}
          </div>
        </div>
      </div>
  );
}