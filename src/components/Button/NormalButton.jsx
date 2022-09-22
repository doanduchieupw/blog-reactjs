const NormalButton = ({ title, icon, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      className={`bg-[#00773e] px-3 rounded-md text-white leading-8 font-medium ${className}`}
      {...props}
    >
      {icon}
      {title}
    </button>
  );
};

export default NormalButton;
