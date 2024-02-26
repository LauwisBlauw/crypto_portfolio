import express from 'express';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';
import { check, validationResult } from 'express-validator';

const app = express();
const priceCache = new NodeCache({ stdTTL: 300 }); // Cache prices for 5 minutes

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.'
});

// Apply rate limiting to all requests
app.use(limiter);

const fetchAllCoins = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching all coins:', error);
    return [];
  }
};

app.get('/', async (req, res) => {
  const allCoins = await fetchAllCoins();
  res.render('index', { allCoins });
});

// Price endpoint with input validation
app.get('/price', [
  check('coin').not().isEmpty().withMessage('Coin ID is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { coin } = req.query;
  const cacheKey = `price-${coin}`;
  const cachedPrice = priceCache.get(cacheKey);

  if (cachedPrice) {
    return res.json({ price: cachedPrice });
  }

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids: coin,
        vs_currencies: 'usd',
      },
    });
    const price = response.data[coin]?.usd;
    if (price !== undefined) {
      priceCache.set(cacheKey, price);
      res.json({ price });
    } else {
      res.status(404).json({ message: 'Coin not found' });
    }
  } catch (error) {
    console.error(`Error fetching price for ${coin}:`, error);
    res.status(500).json({ message: 'Error fetching price' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
