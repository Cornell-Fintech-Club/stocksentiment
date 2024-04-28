import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EquityPieChart from './EquityPieChart';
import StockHistoryGraph from './StockHistoryGraph';
import { fetch_news } from './js-sentiment-model';
import { auth, fetchUserStocks } from '../firebase';
import { db } from '../firebase';
import { collection, doc, deleteDoc, setDoc } from 'firebase/firestore';

interface IStock {
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log('Auth state changed. User:', user);
      if (user) {
        fetchUserStocks(user.uid).then(fetchedStocks => {
          console.log('Fetched stocks:', fetchedStocks);
          setStocks(fetchedStocks);
        }).catch(error => {
          console.error("Error fetching user stocks:", error);
        });
      } else {
        setStocks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [graphButton, setGraphButton] = useState(false);

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
  const handleDeleteStock = async (ticker: string) => {
    if (auth.currentUser) {
      setStocks(stocks.filter(stock => stock.ticker !== ticker));
      const user = auth.currentUser;
      await deleteDoc(doc(db, `users/${user.uid}/stocks`, ticker));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const toggleButton = (ticker: string) => {
    handleTickerClick(ticker);
    if (ticker === selectedTicker || !graphButton) {
      setGraphButton(prevCheck => !prevCheck);
    }
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

  const handleAddStock = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to add a stock.');
      return;
    }

    // Check if the stock already exists in the portfolio
    const existingStockIndex = stocks.findIndex(stock => stock.ticker === newStockInput.ticker);

    if (existingStockIndex !== -1) {
      // If the stock already exists, update its volume
      const existingStock = stocks[existingStockIndex];
      const updatedVolume = existingStock.volume + parseInt(newStockInput.volume);
      const updatedTotalValue = existingStock.currentPrice * updatedVolume;

      const updatedStock = {
        ...existingStock,
        volume: updatedVolume,
        totalValue: Number(updatedTotalValue.toFixed(3)),
      };

      // Update the stock in Firestore
      await setDoc(doc(db, `users/${user.uid}/stocks`, existingStock.ticker), updatedStock);

      // Update the stock in the state
      setStocks(prevStocks => {
        const updatedStocks = [...prevStocks];
        updatedStocks[existingStockIndex] = updatedStock;
        return updatedStocks;
      });

      setIsModalOpen(false); // Close the modal

    } else {
      // Construct the API endpoint with the API key and ticker symbol
      const query = newStockInput.ticker;
      const volume = newStockInput.volume;
      const apiKey = 'VRF428VYVZ9DUYOW';
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${query}&apikey=${apiKey}`;

      const companyUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${query}&apikey=${apiKey}`;

      try {
        // Fetch stock data from Alpha Vantage
        const [quoteResponse, companyResponse] = await Promise.all([
          axios.get(url),
          axios.get(companyUrl)
        ]);

        const quoteData = quoteResponse.data['Global Quote'];
        const companyName = companyResponse.data.Name;
        if (companyName) {
          const sentiment = await fetch_news(quoteData['01. symbol']);
          const formattedSentiment = parseFloat(sentiment.toFixed(3));
          const price = parseFloat(quoteData['05. price']);

          const newStock: IStock = {
            ticker: quoteData['01. symbol'],
            company: companyName,
            boughtInPrice: price,
            currentPrice: price,
            change: parseFloat(quoteData['09. change']),
            changePercent: parseFloat(quoteData['10. change percent']),
            category: getCategory(formattedSentiment),
            sentiment: formattedSentiment,
            volume: parseInt(volume),
            totalValue: Number((price * parseInt(volume)).toFixed(3)),
            link: '#',
          };

          // Add a new document to Firestore in the 'stocks' sub-collection of the current user
          await setDoc(doc(db, `users/${user.uid}/stocks`, newStock.ticker), newStock);

          // Update stocks state with new stock data
          setStocks((currentStocks) => [...currentStocks, newStock]);

          // Reset the input form
          setNewStockInput({
            ticker: '',
            company: '',
            price: '',
            change: '',
            category: '',
            changePercent: '',
            sentiment: '',
            volume: '',
          });
          setIsModalOpen(false); // Close the modal
        } else {
          alert('Stock data not found.');
        }
      } catch (error) {
        // Handle the error
        console.error('Error fetching stock data or adding stock: ', error);
        alert('There was an error processing your request.');
      }
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
      <div style={{ display: 'flex', marginBottom: '1rem' }} className='mt-6'>
        {/* Search input */}
        <input type="text" name="ticker" placeholder="Search by ticker or company" value={searchQuery} onChange={handleSearchChange} className="input input-bordered w-full mb-2" style={{ textTransform: 'capitalize' }} />
        {/* Add new stock button */}
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary ml-2" style={{ width: 'auto' }}>
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
      <div className='flex flex-row'>
        <div className="overflow-x-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <table className="table w-full table-pin-cols" style={{ tableLayout: 'fixed' }}>
            {/* Table head */}
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Name</th>
                <th>Bought-In</th>
                <th>Current</th>
                <th>Value</th>
                <th>Change</th>
                <th>Change %</th>
                <th>Sentiment</th>
                <th>Volume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <tr key={stock.ticker}>
                    <td onClick={() => handleTickerClick(stock.ticker)}>{stock.ticker}</td>
                    <td>{stock.company.split(" ")[0]}</td>
                    <td>${stock.boughtInPrice.toFixed(2)}</td>
                    <td>${stock.currentPrice.toFixed(2)}</td>
                    <td>${stock.totalValue}</td>
                    <td>{stock.change}</td>
                    <td>{stock.changePercent}%</td>
                    <td>{stock.sentiment}</td>
                    <td>{stock.volume}</td>

                    <td>
                      <div className='flex flex-row items-center'>
                        <button onClick={() => toggleButton(stock.ticker)} className="btn btn-sm btn-ghost">
                          <i className="fas fa-chart-line"></i>
                        </button>
                        <button onClick={() => handleDeleteStock(stock.ticker)} className="btn btn-error btn-xs text-custom-red">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
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
        <div className="charts-container" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div>
            <EquityPieChart stocks={filteredStocks} />
          </div>
          {graphButton ?
            (<div>
              {selectedTicker && <StockHistoryGraph ticker={selectedTicker} />}
            </div>) : <></>}
        </div>
      </div>
    </div >
  );
}
