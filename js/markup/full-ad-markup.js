export const createFullAdMarkup = (fullAdModel) => {
  const thumbnailsMarkup = fullAdModel.pictures
      .map((pictureUrl) => `<img src="${pictureUrl}" alt="" class="details-gallery-item">`)
      .join(``);
  return `
  <div class="overlay">
  <article class="details">
    <button class="details-close">Закрыть</button>

    <h2 class="details-title">${fullAdModel.title}</h2>

    <section class="details-main">
      <p class="details-date">три дня назад</p>
      <p class="details-price">${fullAdModel.formattedPrice}</p>

      <section class="details-gallery">
        <img src="${fullAdModel.pictures[0]}" alt="" class="details-gallery-preview">
        <div class="details-gallery-thumbnails">
          ${thumbnailsMarkup}
        </div>
      </section>

      <p class="details-description">Просторная трехкомнатная квартира. Окна на&nbsp;восток. 15&nbsp;минут пешком до&nbsp;метро. В&nbsp;собственности более трех лет. Согласованная перепланировка. Подходит под ипотеку</p>
    </section>

    <aside class="details-aside">
      <section class="details-address">
        <p class="details-address-text">${fullAdModel.fullAddress}</p>
        <div class="details-address-map" data-lat="${fullAdModel.address.lat}" data-lng="${fullAdModel.address.lng}"></div>
      </section>

      <section class="details-seller">
        <a href="#" class="details-seller-link">
          <h3 class="details-seller-name">${fullAdModel.sellerName}</h3>
        </a>

        <p class="details-seller-rating details-seller-rating-${fullAdModel.sellerRatingStyleModifier}">
          рейтинг <span class="details-seller-rating-val">${fullAdModel.sellerRating}</span>
          <a href="#">Отзывы</a>
        </p>
      </section>
    </aside>
  </article>
</div>`.trim();
};
