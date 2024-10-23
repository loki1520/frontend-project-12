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
import { closeModal } from '../slices/modalsSlice.js';

const AddChannels = () => {
  const channelsList = useSelector((state) => state.channels.channelsList);
  const names = channelsList.map((channel) => channel.name);

  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },

    validationSchema: Yup.object({
      channelName: Yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле')
        .notOneOf(names, 'Должно быть уникальным'),
    }),

    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              id="channelName"
              name="channelName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
              className={classNames('form-control', 'mb-2', {
                'is-invalid': formik.errors.channelName && formik.submitCount > 0,
              })}
            />

            {formik.errors.channelName ? (
              <div className="invalid-feedback">{formik.errors.channelName}</div>
            ) : null}

          </FormGroup>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-2 btn btn-secondary"
              onClick={handleClose}
            >
              Отменить
            </button>
            <button type="submit" className="btn btn-primary">
              Отправить
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannels;
