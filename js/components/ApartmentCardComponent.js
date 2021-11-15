class ApartmentCardComponent {
  static USD_EUR = 0.88;
  
  constructor(props) {
    this.props = props;
    this.init();
  }

  init = () => {
    const { type, owner: { fullname, email, phone }, roomCount, squares, 
    address: { city, country, street, number }, price: { amount, currency }, imgSrc, onDelete } = this.props;

    const finalPrice = currency === '$' ? amount * ApartmentCardComponent.USD_EUR : amount;
    const formatredPrice = Math.round(100 * finalPrice) / 100; 

    this.htmlElement = document.createElement('article');
    this.htmlElement.className = 'card p-3 shadow';
    this.htmlElement.innerHTML = `
    <img src="${imgSrc}" class="card-img-top"/ height="200px" style="object-fit: cover">
      <div class="card-body d-flex flex-column">
      <h2 class="h4">${type}</h2>
      <div>
        <strong>Address</strong>:
        <span>${street} ${number}, ${city}, ${country}</span>
      </div>

      <div>
        <strong>Room count</strong>:
        <span>${roomCount}</span>
      </div>
      <div>
        <strong>Squares</strong>:
        <span>${squares}</span>
      </div>
      
      <h3 class="h5 mt-3">Owner</h3>
      <ul>
        <li>
          <strong>full name</strong>:
          <span>${fullname}</span>
        </li>
        <li>
          <strong>phone</strong>:
          <span>${phone}</span>
        </li>
        <li>
          <strong>email</strong>:
          <span>${email}</span>
        </li>
      </ul>

      <div class="text-center mb-3">
        <div class="h5 text-success">${formatredPrice} €</div>
      </div>

      <div class="text-center mt-auto">
        <button class="btn btn-danger">Ištrinti</button>
      </div>
    `;

    const btn = this.htmlElement.querySelector('.btn');
    btn.addEventListener('click', onDelete);
  }
}