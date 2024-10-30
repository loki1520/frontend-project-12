import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';
import loginImg from '../assets/login.png';
import routes from '../routes.js';
import Header from '../components/Header.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const { location, navigate } = useAuth();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        // response.data => {token: 'eyJhbGciOiJIUzI1NiIcC...tEhfmdQaTA8vC-055o', username: 'admin'}
        localStorage.setItem('userData', JSON.stringify(response.data));
        actions.resetForm();
        navigate('/', { state: { from: location } });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          actions.setErrors({ errorUnauthorized: t('formikErrors.unatorized') });
        }
        throw error;
      }
    },
  });

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header />
          <div className="container-fluid h-100">
            <div
              style={{ minHeight: '90vh' }}
              className="row justify-content-center align-content-center h-100"
            >
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src={loginImg} className="img-fluid" alt="loginImg" />
                    </div>
                    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                      <h1 className="text-center mb-4">{t('login.title')}</h1>
                      <div className="form-floating mb-3">
                        <input
                          ref={inputRef}
                          name="username"
                          id="username"
                          type="text"
                          required
                          placeholder={t('login.username')}
                          className={classNames('form-control', {
                            'is-invalid': formik.errors.errorUnauthorized && formik.touched.username,
                          })}
                          autoComplete="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                        />
                        <label htmlFor="username">{t('login.username')}</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          name="password"
                          id="password"
                          type="password"
                          required
                          placeholder={t('login.password')}
                          className={classNames('form-control', {
                            'is-invalid': formik.errors.errorUnauthorized && formik.touched.password,
                          })}
                          autoComplete="current-password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                        <label htmlFor="password">{t('login.password')}</label>

                        {formik.errors.errorUnauthorized ? (
                          <div className="invalid-tooltip">
                            {formik.errors.errorUnauthorized}
                          </div>
                        ) : null}

                      </div>
                      <button disabled={formik.isSubmitting} type="submit" className="w-100 mb-3 btn btn-outline-primary">
                        {t('login.title')}
                      </button>
                    </form>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>
                        {t('login.footerPart1')}
                      </span>
                      <a href="/signup">{t('login.footerPart2')}</a>
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
};

export default LoginPage;
