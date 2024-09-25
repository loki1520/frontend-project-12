import { Formik, Form, Field } from 'formik';
import loginImg from '../assets/login.png';

// window centring
const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const LoginPage = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hexlet Chat
            </a>
          </div>
        </nav>
        <div style={modalStyle} className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img
                      src={loginImg}
                      className="w-50 img-fluid"
                      alt="Войти"
                    />
                  </div>
                  <Formik
                    initialValues={{
                      username: '',
                      password: '',
                    }}
                    onSubmit={async (values) => {
                      await new Promise((resolve) => setTimeout(resolve, 500));
                      console.log(JSON.stringify(values, null, 2));
                    }}
                  >
                    <Form className="col-12 col-md-6 mt-3 mt-md-0">
                      <h1 className="text-center mb-4">Войти</h1>
                      <div className="form-floating mb-3">
                        <Field
                          name="username"
                          id="username"
                          type="text"
                          required
                          placeholder="Ваш ник"
                          className="form-control"
                          autoComplete="username"
                        />
                        <label htmlFor="username">Ваш ник</label>
                      </div>
                      <div className="form-floating mb-3">
                        <Field
                          name="password"
                          id="password"
                          type="password"
                          required
                          placeholder="Пароль"
                          className="form-control"
                          autoComplete="current-password"
                        />
                        <label htmlFor="password">Пароль</label>
                      </div>
                      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                        Войти
                      </button>
                    </Form>
                  </Formik>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>Нет аккаунта? </span>
                    <a href="/signup">Регистрация</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
