import loginImg from '../../assets/404-error.png';

const notFoundPage = () => (
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
          src={loginImg}
        />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          <span> Но вы можете перейти </span>
          <a href="/">на главную страницу </a>
        </p>
      </div>
    </div>
    <div className="Toastify" />
  </div>
);

export default notFoundPage;
