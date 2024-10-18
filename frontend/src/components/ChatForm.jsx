import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { addMessage } from '../slices/messagesSlice.js';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';
import socket from '../socket.js';

const ChatForm = () => {
  const { user } = useAuth();
  const { currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => { inputRef.current.focus(); }, []);

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      // console.log(socket.connected); // true
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, actions) => {
      if (!user) {
        console.error('something with token in chatForm');
        return;
      }
      const { username, token } = user;

      const newMessage = { body: values, channelId: currentChannelId, username };
      axios.post(routes.messagesPath(), newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log(response.data);
        // => { id: '1', body: 'new message', channelId: '1', username: 'admin }
      });
      actions.resetForm();
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className="py-1 border rounded-2"
      >
        <InputGroup hasValidation>
          <Form.Control
            ref={inputRef}
            id="message"
            name="message"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2"
          />
          <Button
            disabled={formik.isSubmitting || !formik.values.message.trim()}
            type="submit"
            className="btn btn-group-vertical"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
              />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
export default ChatForm;
