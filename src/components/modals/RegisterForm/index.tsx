import { useState, FormEvent } from 'react';
import { useModal, useUser } from 'services/context';
import { formStyles } from 'utils/styles';
import LoginForm from '../LoginForm';

export default function RegisterForm() {
  const { register } = useUser();
  const { showModal, hideModal } = useModal();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');

    if (register(formData)) hideModal();
  };

  const openLoginModal = () => {
    showModal(<LoginForm />);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <h2 style={formStyles.title}>Create Your Celestial Account 🌌</h2>

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
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        style={formStyles.input}
        required
      />
      <input
        type="date"
        name="birthDate"
        placeholder="Birth Date"
        value={formData.birthDate}
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
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        style={formStyles.input}
        required
      />

      {error && <p style={formStyles.error}>{error}</p>}

      <button type="submit" style={formStyles.button}>
        Register
      </button>

      <p style={formStyles.footerText}>
        Already have an account?{' '}
        <a onClick={openLoginModal} style={formStyles.link}>
          Log in
        </a>
      </p>
    </form>
  );
}
