// Use ES6 import syntax for express and axios
import express from 'express';
import axios from 'axios';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Apply a rate limit to the /price endpoint to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests, please try again after a minute.'
});

// Function to fetch cryptocurrencies sorted by market cap
async function fetchCoinsSortedByMarketCap(currency = 'usd') {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 250,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    return [];
  }
}

// Home route that renders the index.ejs template with sorted coins data
app.get('/', async (req, res) => {
  const defaultCurrency = 'usd'; // Default currency can be dynamic based on user preference or geolocation
  const coinsSortedByMarketCap = await fetchCoinsSortedByMarketCap(defaultCurrency);
  res.render('index', { allCoins: coinsSortedByMarketCap, currency: defaultCurrency });
});

// Apply the rate limiter middleware to the /price endpoint
app.use('/price', apiLimiter);

// Route to fetch the price of a specific cryptocurrency in a selected currency
app.get('/price', async (req, res) => {
  const { coin, currency = 'usd' } = req.query;
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids: coin,
        vs_currencies: currency,
      },
    });
    if (response.data[coin] && response.data[coin][currency] !== undefined) {
      const price = response.data[coin][currency];
      res.json({ price });
    } else {
      res.status(404).json({ message: 'Price information not available for the specified coin and currency.' });
    }
  } catch (error) {
    console.error(`Error fetching price for ${coin} in ${currency}:`, error);
    res.status(500).json({ message: 'Error fetching price from the API.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
