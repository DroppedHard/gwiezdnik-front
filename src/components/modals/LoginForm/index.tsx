import { useState, FormEvent } from 'react';
import { useModal, useUser } from 'services/context';
import RegisterForm from '../RegisterForm';
import { formStyles } from 'utils/styles';

export default function LoginForm() {
  const { login } = useUser();
  const { showModal, hideModal } = useModal();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      // TODO - on fail do not close modal, but try again+ error with Toast or sth
      login(formData, { onSuccess: hideModal });
    }
  };

  const openRegisterModal = () => {
    showModal(<RegisterForm />);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <h2 style={formStyles.title}>Welcome, Stargazer ✨</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={formStyles.input}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={formStyles.input}
        required
      />
      <button type="submit" style={formStyles.button}>
        Login
      </button>
      <p style={formStyles.footerText}>
        Don't have an account?{' '}
        <a onClick={openRegisterModal} style={formStyles.link}>
          Register
        </a>
      </p>
    </form>
  );
}
