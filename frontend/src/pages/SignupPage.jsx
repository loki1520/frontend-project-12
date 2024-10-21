import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Card } from 'react-bootstrap';
import classNames from 'classnames';
import axios from 'axios';
import useAuth from '../hooks/useAuth.jsx';
import congratImg from '../assets/congrat.png';
import routes from '../routes.js';

const RegistrationPage = () => {
  const { location, navigate } = useAuth();

  const inputRef = useRef();
  useEffect(() => { inputRef.current.focus(); }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),
      password: Yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    }),
    onSubmit: async (values, actions) => {
      const { confirmPassword, ...dataToSend } = values;
      try {
        const response = await axios.post(routes.signupPath(), dataToSend);
        localStorage.setItem('userData', JSON.stringify(response.data));
        actions.resetForm();
        navigate('/', { state: { from: location } });
      } catch (error) {
        console.error('Ошибка:', error);
        if (error.response && error.response.status === 409) {
          actions.setErrors({ userAlreadyExists: 'Такой пользователь уже существует' });
        }
        throw error;
      }
    },
  });
  console.log(formik.errors);
  return (
    <div className="h-100 bg-light">
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
            <div className="container-fluid h-100">
              <div className="row justify-content-center align-content-center h-100" style={{ minHeight: '90vh' }}>
                <div className="col-12 col-md-8 col-xxl-6">
                  <Card className="shadow-sm">
                    <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                      <div>
                        <img
                          src={congratImg}
                          style={{ width: '200px', height: '200px' }}
                          alt="Регистрация"
                        />
                      </div>
                      <Form onSubmit={formik.handleSubmit} className="w-50">
                        <h1 className="text-center mb-4">Регистрация</h1>
                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            ref={inputRef}
                            name="username"
                            id="username"
                            type="text"
                            required
                            placeholder="Ваш ник"
                            className={classNames('form-control', {
                              'is-invalid': (formik.errors.username && formik.touched.username) || formik.errors.userAlreadyExists,
                            })}
                            autoComplete="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                          />
                          <Form.Label htmlFor="username">Имя пользователя</Form.Label>

                          {formik.touched.username && formik.errors.username ? (
                            <div className="invalid-tooltip">{formik.errors.username}</div>
                          ) : null}

                        </Form.Group>
                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            name="password"
                            id="password"
                            type="password"
                            required
                            placeholder="Пароль"
                            className={classNames('form-control', {
                              'is-invalid': (formik.touched.password && formik.errors.password) || formik.errors.userAlreadyExists,
                            })}
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                          <Form.Label htmlFor="password">Пароль</Form.Label>

                          {formik.touched.password && formik.errors.password ? (
                            <div className="invalid-tooltip">{formik.errors.password}</div>
                          ) : null}
                        </Form.Group>
                        <Form.Group className="form-floating mb-4">
                          <Form.Control
                            name="passwordConfirmation"
                            id="passwordConfirmation"
                            type="password"
                            required
                            placeholder="Пароль"
                            className={classNames('form-control', {
                              'is-invalid': (formik.errors.passwordConfirmation && formik.touched.passwordConfirmation) || formik.errors.userAlreadyExists,
                            })}
                            autoComplete="current-passwordConfirmation"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirmation}
                          />
                          <Form.Label htmlFor="passwordConfirmation">Подтвердите пароль</Form.Label>

                          {formik.touched.passwordConfirmation
                            && formik.errors.passwordConfirmation ? (
                              <div className="invalid-tooltip">{formik.errors.passwordConfirmation}</div>
                            ) : null}

                          {formik.errors.userAlreadyExists ? (
                            <div className="invalid-tooltip">{formik.errors.userAlreadyExists}</div>
                          ) : null}

                          {/* {formik.errors.userAlreadyExists ? (
                            <div
                              className="invalid-tooltip"
                              style={{
                                display: 'block', // Элемент будет всегда видим
                                position: 'absolute', // Можно изменить на absolute или relative
                                marginTop: '2px', // Отступ сверху
                              }}
                            >
                              {formik.errors.userAlreadyExists}
                            </div>
                          ) : null} */}
                        </Form.Group>
                        <Button disabled={formik.isSubmitting} type="submit" className="w-100" variant="outline-primary">
                          Зарегистрироваться
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
