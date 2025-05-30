export const formStyles: Record<string, React.CSSProperties> = {
  form: {
    width: '100%',
    maxWidth: '360px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: '20px',
    marginTop: '0',
    textAlign: 'center',
    color: 'white',
  },
  input: {
    padding: '10px',
    marginBottom: '12px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: 'none',
    borderBottom: '2px solid white',
    borderRadius: '4px',
    color: 'white',
    outline: 'none',
    fontSize: '14px',
  },
  selectWrapper: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    marginBottom: '12px',
  },
  select: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: 'white',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
  },
  selectOption: {
    backgroundColor: '#111',
    color: 'white',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: 'white',
  },
  button: {
    margin: '10px 0px',
    padding: '10px',
    backgroundColor: '#6b21a8',
    border: 'none',
    color: 'white',
    fontWeight: 600,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
  footerText: {
    marginTop: '15px',
    fontSize: '12px',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
  },
  link: {
    color: 'white',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  error: {
    color: '#ff6666',
    fontSize: '12px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  infoItem: {
    backgroundColor: 'transparent',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    marginBottom: '8px',
  },
};
