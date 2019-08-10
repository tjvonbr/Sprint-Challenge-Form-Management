import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState({ username: "", password: "" })

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
      setValue({ username: "", password: "" });
      console.log("Users", users)
    }
  }, [status]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/restricted/data')
      .then(response => setUsers(response.data))
      .catch(error => {
        console.log("Error", error);
      })
  }, [users]);

  return (
    <>
      <div className="user-form">
        <h1 className="form-header">User Registration Form</h1>
        <Form>
          <div className="username-wrapper">
            <Field type="text" name="username" placeholder="Name" />
              <p className="field-description">Please enter your full name.</p>
              {touched.username && errors.username && (
              <p className="error">*{ errors.username }</p>
              )}
          </div>
          <div className="password-wrapper">
            <Field type="password" name="password" placeholder="Password" />
              <p className="field-description">Passwords must contain at least 8 characters.</p>
              {touched.password && errors.password && (
              <p className="error">*{ errors.password }</p>
              )}
          </div>
          <button className="btn submit-btn" type="submit">Submit</button>
        </Form>
      </div>

      <div className="users-container">
        {users.map((user, index) => (
          <UserCard user={user}
                    key={index}
          />))}
      </div>
    </>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || '',
      password: password || ''
    }
  },

  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('Username is a required field'),
    password: Yup.string()
      .required('Password is a required field')
      .min(8, 'Please make sure your password contains at least 8 characters.')
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post('http://localhost:5000/api/register', values)
      .then(response => {
        setStatus(response);
        resetForm();
        console.log('Response', response)
      })
      .catch(error => console.log(error.response, error))
  },

})(UserForm)

export default FormikUserForm;