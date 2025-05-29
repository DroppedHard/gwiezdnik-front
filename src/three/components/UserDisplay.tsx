import { useState } from 'react';
import { Html } from '@react-three/drei';
import LoginForm from 'components/modals/LoginForm';
import { useModal, useUser } from 'services/context';
import UserInfoPanel from 'components/modals/UserInfoPanel';

const MAX_USERNAME_LENGTH = 10;
// TODO positioning, size applicable to username
export function UserDisplay() {
  const [hovered, setHovered] = useState(false);
  const { showModal } = useModal();
  const { user } = useUser();
  const loggg = () => {
    if (user?.email) showModal(<UserInfoPanel />);
    else showModal(<LoginForm />);
  };

  return (
    <Html position={[-5, 5.5, -4]} transform occlude zIndexRange={[0, 10]}>
      <button
        onClick={loggg}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: 'none',
          padding: '12px 24px',
          borderRadius: '12px',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          background: hovered
            ? 'radial-gradient(circle at center, #1380a5, #000822)'
            : 'radial-gradient(circle at center, #003344, #000822)',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 600,
          boxShadow: hovered
            ? '0 0 20px rgba(76, 161, 189, 0.6)'
            : '0 0 10px rgba(0, 128, 255, 0.2)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      >
        {user?.username
          ? user?.username.length > MAX_USERNAME_LENGTH
            ? user?.username.substring(0, MAX_USERNAME_LENGTH - 2) + '..'
            : user?.username
          : 'Log in'}
      </button>
    </Html>
  );
}
