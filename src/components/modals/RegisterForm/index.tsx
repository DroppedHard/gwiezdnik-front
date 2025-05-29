import { useState, FormEvent } from 'react';
import { useModal, useUser } from 'services/context';
import { formStyles } from 'utils/styles';
import LoginForm from '../LoginForm';
import { toast } from 'react-toastify';
import { RegisterCredentials } from 'utils/types';

export default function RegisterForm() {
  const { register } = useUser();
  const { showModal } = useModal();

  const [formData, setFormData] = useState<RegisterCredentials>({
    email: '',
    name: '',
    date_of_birth: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openLoginModal = () => {
    showModal(<LoginForm />);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    register(formData, { onSuccess: openLoginModal });
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
        name="name"
        placeholder="Username"
        value={formData.name}
        onChange={handleChange}
        style={formStyles.input}
        required
      />
      <input
        type="date"
        name="date_of_birth"
        placeholder="Birth Date"
        value={formData.date_of_birth}
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
