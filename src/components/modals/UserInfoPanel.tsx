import { useModal, useUser } from 'services/context';
import { formStyles } from 'utils/styles';

export default function UserInfoPanel() {
  const { user, logout } = useUser();
  const { hideModal } = useModal();

  const handleLogout = () => {
    logout();
    hideModal();
  };

  if (!user) {
    return (
      <div style={formStyles.form}>
        <h2 style={formStyles.title}>Not logged in</h2>
      </div>
    );
  }

  return (
    <div style={formStyles.form}>
      <h2 style={formStyles.title}>User Info</h2>

      <div style={{ ...formStyles.input, ...formStyles.infoItem }}>
        <strong>Email:</strong> {user.email}
      </div>

      {user.username && (
        <div style={{ ...formStyles.input, ...formStyles.infoItem }}>
          <strong>Username:</strong> {user.username}
        </div>
      )}

      {user.birthDate && (
        <div style={{ ...formStyles.input, ...formStyles.infoItem }}>
          <strong>Birth Date:</strong> {user.birthDate}
        </div>
      )}

      {user.sign && (
        <div style={{ ...formStyles.input, ...formStyles.infoItem }}>
          <strong>Zodiac Sign:</strong> {user.sign}
        </div>
      )}

      <button onClick={handleLogout} style={formStyles.button}>
        Log Out
      </button>
    </div>
  );
}
