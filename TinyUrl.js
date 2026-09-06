
class TinyUrl {
  constructor() {
    this.urlMap = new Map();
    this.counter = 0;
    this.baseUrl = 'http://tinyurl.com/';
    this.reverseUrlMap = new Map();
  }

  encode(longUrl) {
    if (this.reverseUrlMap.has(longUrl)) {
      return this.reverseUrlMap.get(longUrl);
    }

    const shortUrl = this.baseUrl + this.counter++;
    this.urlMap.set(shortUrl, longUrl);
    this.reverseUrlMap.set(longUrl, shortUrl);
    return shortUrl;
  }

  decode(shortUrl) {
    return this.urlMap.get(shortUrl) || null;
  }
}


const tinyUrlService = new TinyUrl();
const longUrl = 'https://www.example.com/some/long/url';
const shortUrl = tinyUrlService.encode(longUrl);
console.log(`Short URL for ${longUrl}: ${shortUrl}`);
console.log(`Original URL for ${shortUrl}: ${tinyUrlService.decode(shortUrl)}`);