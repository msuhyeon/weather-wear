import styles from "./styles.module.css";

// <button>에서 사용할 수 있는 모든 기본 속성
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({
  className = "",
  type = "button",
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
