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
    return Promise.all([
      DataAdapter.adaptFullProduct(fullProduct)
          .then(({fullAddress, pictures, formattedPrice}) => {
            this.title = fullProduct.title;
            this.address = fullProduct.address;
            this.fullAddress = fullAddress;
            this.pictures = pictures;
            this.formattedPrice = formattedPrice;
          }),
      DataLoader.load(`${config.SELLERS_URL}/${fullProduct.relationships.seller}`)
          .then(({name: sellerName, rating: sellerRating}) => {
            this.sellerName = sellerName;
            this.sellerRating = sellerRating;
            this.sellerRatingStyleModifier = getRatingStyleModifier(sellerRating);
          })
    ]);
  }

};

export default FullAdModel;
