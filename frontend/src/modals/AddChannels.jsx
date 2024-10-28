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
import socket from '../socket.js';
import routes from '../routes.js';
import { closeModal } from '../slices/modalsSlice.js';
import { addChannel } from '../slices/channelsSlice.js';
import useAuth from '../hooks/useAuth.js';

const AddChannels = () => {
  const { user: { token } } = useAuth();
  const dispatch = useDispatch();

  const channelsList = useSelector((state) => state.channels.channelsList);
  const channelsNames = channelsList.map((channel) => channel.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    // test 1-4
    if (socket.connected) {
      console.log('WebSocket connected');
    } else {
      console.error('WebSocket error');
    }

    socket.on('newChannel', (payload) => {
      // payload => { id: 6, name: "new channel", removable: true }
      dispatch(addChannel(payload));
    });
    socket.emit('newChannel', 'Hello, my name is Client');
    return () => {
      socket.off('newChannel');
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле')
        .notOneOf(channelsNames, 'Должно быть уникальным'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(routes.channelsPath(), values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // => { id: '3', name: 'new channel', removable: true }

        // test #2
        // await axios.get('/api/v1/channels', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }).then((response) => {
        //   console.log(response.data);
        // });
        dispatch(closeModal());
      } catch (error) {
        console.error('Ошибка при добавлении канала', error);
      }
    },
  });

  return (
    <Modal show centered onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
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
