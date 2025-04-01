const Button = ({ children, className = '', ...props }) => {
    return (
      <button
        className={`bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  
  export default Button