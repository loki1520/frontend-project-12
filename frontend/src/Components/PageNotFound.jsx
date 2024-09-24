import logo from '../assets/404-error.png';

const PageNotFound = () => (
  <div className="h-100 bg-ligth">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hexlet Chat
            </a>
          </div>
        </nav>
        <div className="text-center">
          <img
            alt="Страница не найдена"
            className="w-25 img-fluid" // Устанавливаем ширину в 25%
            src={logo}
          />
          <h1 className="h4 text-muted">Страница не найдена</h1>
          <p className="text-muted">
            Но вы можете перейти&nbsp;
            <a href="/">на главную страницу </a>
          </p>
        </div>
      </div>
      <div className="Toastify" />
    </div>
  </div>
);

export default PageNotFound;
