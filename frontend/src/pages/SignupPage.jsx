import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Card } from 'react-bootstrap';
import classNames from 'classnames';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';
import congratImg from '../assets/congrat.png';
import routes from '../routes.js';
import Header from '../components/Header.jsx';

const RegistrationPage = () => {
  const { t } = useTranslation();

  const { location, navigate } = useAuth();

  const inputRef = useRef();
  useEffect(() => { inputRef.current.focus(); }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('errors.countSymbols'))
        .max(20, t('errors.countSymbols'))
        .required(t('errors.required')),
      password: Yup.string()
        .min(6, t('errors.passCountSymbols'))
        .required(t('errors.required')),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], t('errors.passwordConfirmNotOneOff')),
    }),

    onSubmit: async (values, actions) => {
      const { confirmPassword, ...dataToSend } = values;
      try {
        const response = await axios.post(routes.signupPath(), dataToSend);
        localStorage.setItem('userData', JSON.stringify(response.data));
        actions.resetForm();
        navigate('/', { state: { from: location } });
      } catch (error) {
        if (error.response && error.response.status === 409) {
          actions.setErrors({ userAlreadyExists: t('errors.userAlreadyExists') });
        }
        throw error;
      }
    },
  });

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Header />
            <div className="container-fluid h-100">
              <div className="row justify-content-center align-content-center h-100" style={{ minHeight: '90vh' }}>
                <div className="col-12 col-md-8 col-xxl-6">
                  <Card className="shadow-sm">
                    <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                      <div>
                        <img
                          src={congratImg}
                          style={{ width: '200px', height: '200px' }}
                          alt="congratImg"
                        />
                      </div>
                      <Form onSubmit={formik.handleSubmit} className="w-50">
                        <h1 className="text-center mb-4">{t('signUp.title')}</h1>
                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            ref={inputRef}
                            name="username"
                            id="username"
                            type="text"
                            required
                            placeholder={t('signUp.username')}
                            className={classNames('form-control', {
                              'is-invalid': (formik.errors.username && formik.touched.username) || formik.errors.userAlreadyExists,
                            })}
                            autoComplete="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                          />
                          <Form.Label htmlFor="username">{t('signUp.username')}</Form.Label>

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
                            placeholder={t('signUp.password')}
                            className={classNames('form-control', {
                              'is-invalid': (formik.touched.password && formik.errors.password) || formik.errors.userAlreadyExists,
                            })}
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                          />
                          <Form.Label htmlFor="password">{t('signUp.password')}</Form.Label>

                          {formik.touched.password && formik.errors.password ? (
                            <div className="invalid-tooltip">{formik.errors.password}</div>
                          ) : null}

                        </Form.Group>
                        <Form.Group className="form-floating mb-4">
                          <Form.Control
                            name="passwordConfirm"
                            id="passwordConfirm"
                            type="password"
                            required
                            placeholder={t('signUp.confirmPassword')}
                            className={classNames('form-control', {
                              'is-invalid': (formik.errors.passwordConfirm && formik.touched.passwordConfirm) || formik.errors.userAlreadyExists,
                            })}
                            autoComplete="current-passwordConfirm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirm}
                          />
                          <Form.Label htmlFor="passwordConfirm">{t('signUp.confirmPassword')}</Form.Label>

                          {formik.touched.passwordConfirm
                            && formik.errors.passwordConfirm ? (
                              <div className="invalid-tooltip">{formik.errors.passwordConfirm}</div>
                            ) : null}

                          {formik.errors.userAlreadyExists ? (
                            <div className="invalid-tooltip">{formik.errors.userAlreadyExists}</div>
                          ) : null}

                        </Form.Group>
                        <Button disabled={formik.isSubmitting} type="submit" className="w-100" variant="outline-primary">
                          {t('signUp.signButton')}
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
