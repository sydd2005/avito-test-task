import DataLoader from "../data/data-loader";
import config from "../config";
import DataAdapter from "../data/data-adapter";

const RATING_STYLE_MODIFIER = {
  GOOD: `good`,
  AVERAGE: `average`,
  BAD: `bad`
};

const GOOD_MIN_RATING = 4.8;
const AVERAGE_MIN_RATING = 4.0;

const getRatingStyleModifier = (ratingValue) => {
  switch (true) {
    case +ratingValue > GOOD_MIN_RATING:
      return RATING_STYLE_MODIFIER.GOOD;
    case +ratingValue < AVERAGE_MIN_RATING:
      return RATING_STYLE_MODIFIER.BAD;
    default:
      return RATING_STYLE_MODIFIER.AVERAGE;
  }
};

const FullAdModel = class {

  constructor(productId) {
    this._productId = productId;
  }

  async update() {
    const fullProduct = await DataLoader.load(`${config.PRODUCTS_URL}/${this._productId}`);
    const {fullAddress, pictures, formattedPrice} = await DataAdapter.adaptFullProduct(fullProduct);
    this.title = fullProduct.title;
    this.address = fullProduct.address;
    this.fullAddress = fullAddress;
    this.pictures = pictures;
    this.formattedPrice = formattedPrice;
    const {name: sellerName, rating: sellerRating} = await DataLoader.load(`${config.SELLERS_URL}/${fullProduct.relationships.seller}`);
    this.sellerName = sellerName;
    this.sellerRating = sellerRating;
    this.sellerRatingStyleModifier = getRatingStyleModifier(sellerRating);
  }

};

export default FullAdModel;
