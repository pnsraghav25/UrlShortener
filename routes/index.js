const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const app = express();
const config = require('config');
const Url = require('../models/Url');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ error: 'Invalid base URL' });
  }

  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json({ error: 'Invalid long URL' });
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.json(url);
    } else {
      const urlCode = shortid.generate();
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = new Url({ longUrl, shortUrl, urlCode });
      await url.save();

      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



router.get('/links', async (req, res) => {
  try {
    const urls = await Url.find().sort({ date: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
