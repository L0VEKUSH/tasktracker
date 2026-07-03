import { FiLoader } from 'react-icons/fi';

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger',
  ghost: 'btn-ghost',
};

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  icon: Icon,
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {loading ? (
        <FiLoader className="animate-spin" size={16} />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
    </button>
  );
}
