import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Modal,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import classNames from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import { closeModal } from '../slices/modalsSlice.js';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import useAuth from '../hooks/useAuth.js';

const AddChannel = () => {
  const { t } = useTranslation();

  const { user: { token } } = useAuth();
  const dispatch = useDispatch();

  const { channelsList } = useSelector((state) => state.channels);
  const channelsNames = channelsList.map((channel) => channel.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('formikErrors.countSymbols'))
        .max(20, t('formikErrors.countSymbols'))
        .required(t('formikErrors.required'))
        .notOneOf(channelsNames, t('formikErrors.unicumName')),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.channelsPath(), values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success(t('toastify.addedChannel'));
        dispatch(setCurrentChannel(response.data.id));
        dispatch(closeModal());
      } catch (error) {
        toast.error(t('errors.addChannel'));
        console.error(t('errors.addChannel'), error);
      }
    },
  });

  return (
    <Modal show centered onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('mainPage.addChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Form.Label className="visually-hidden" htmlFor="name">{t('mainPage.channelName')}</Form.Label>
            <FormControl
              ref={inputRef}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={classNames('form-control', 'mb-2', {
                'is-invalid': formik.errors.name && formik.submitCount > 0,
              })}
            />

            {formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}

          </FormGroup>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-2 btn btn-secondary"
              onClick={() => dispatch(closeModal())}
            >
              {t('mainPage.cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('mainPage.send')}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
