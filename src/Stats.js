import React , {useState, useEffect} from 'react'
import './Stats.css'
import axios from "axios";
import StatsRow from './StatsRow'
import { db } from './firebase';
import { LineAxisOutlined } from '@mui/icons-material';

const TOKEN = "d39mo6pr01qoho9ghgi0d39mo6pr01qoho9ghgig";
const BASE_URL = "https://finnhub.io/api/v1/quote";

function Stats() {
  const [stockData, setStockData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);

  const getStocksData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error)=> {
        console.error("Error", error.message);
      });
  };

  // define the function you call later
  const getMyStocks = () => {
    db.collection('myStocks').onSnapshot((snapshot) => {
      let promises = [];
      let tempData = [];
      snapshot.docs.map((doc) => {
        // console.log(doc.data()) // optional; not required to run
        promises.push(
          getStocksData(doc.data().ticker).then((res) => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: res.data
            });
          })
        );
        return null; // silence map return
      });
      Promise.all(promises).then(() => {
        console.log(tempData);
        setMyStocks(tempData);
      });
    });
  };

  useEffect(()=>{
    let tempStocksData = [];
    const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];

    let promises = [];
    getMyStocks();

    stocksList.map((stock) => {
      promises.push(
        getStocksData(stock).then((res) => {
          if (res && res.data) {
            tempStocksData.push({
              name: stock,
              ...res.data
            });
          }
        })
      );
      return null; // silence map return
    });

    Promise.all(promises).then(()=>{
      setStockData(tempStocksData);
      console.log(tempStocksData);
    });
  }, []);

  return (
    <div className = "stats">
      <div className = "stats__container">
        <div className = "stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className = "stats__rows">
            {/* your Firestore rows (optional to render) */}
            {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                shares = {stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className = "stats__header stats__lists">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className = "stats__rows">
            {stockData.map((stock)=> (
              <StatsRow
                key = {stock.name}
                name = {stock.name}
                openPrice = {stock.o}
                price = {stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
