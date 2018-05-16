const ProductsModel = class {

  constructor(id, category, title, price, address, pictures) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.price = price;
    this.address = address;
    this.pictures = pictures;
  }

};

export default ProductsModel;
