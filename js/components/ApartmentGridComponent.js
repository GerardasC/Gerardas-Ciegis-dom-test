class ApartmentGridComponent {
  constructor() {
    this.state = {
      loading: false,
      apartments: []
    }
    this.init()
  }

  fetchApartments = () => { setTimeout(() => {

    API.fetchApartments(
      (apartments) => {
        this.state.loading = false;
        this.saveApartments(apartments);
      },
      (err) => {
        alert(err);
        this.state.loading = false;
        this.render();
      }
    )

  }, 1000)}

  saveApartments = (apartments) => {
    this.state.apartments = apartments;
    this.render();
  }

  deleteApartment = (id) => {
    API.deleteApartments(
      id,
      () => API.fetchApartments(this.saveApartments, alert),
      alert
    );
  }

  init = () => {
    this.state.loading = true;
    this.fetchApartments();
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'row g-3';
    this.render();
  }

  wrapInColumn = (element) => {
    const column = document.createElement('div');
    column.className = 'col-12 col-sm-6 col-lg-4 col-xl-3 d-flex';
    column.appendChild(element);
    return column;
  }

  render = () => {
    const { loading, apartments } = this.state;
    if (loading) {
      this.htmlElement.innerHTML = `<div class="text-center"><img src="assets/loading.gif"/></div>`;
      
    } else if (apartments.length > 0) {
      this.htmlElement.innerHTML = '';
      
      const apartmentElements = apartments
      .map(({id, ...props}) => new ApartmentCardComponent({
        ...props,
        onDelete: () => this.deleteApartment(id)
      }))
      .map(x => x.htmlElement)
      .map(this.wrapInColumn);
      
      this.htmlElement.append(...apartmentElements);

    } else {
      this.htmlElement.innerHTML = `<h2>Šiuo metu skelbimų nėra</h2>`;
    }
  }
}