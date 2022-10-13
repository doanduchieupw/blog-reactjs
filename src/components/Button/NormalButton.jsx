const NormalButton = ({ title, icon, type = 'button', className = '', primary, ...props }) => {
  return (
    <button
      type={type}
      className={`${
        primary ? 'bg-[#00773e] text-white' : ' border border-[#00773e] text-[#00773e] bg-white'
      }  px-3 rounded-md  leading-8 font-medium ${className}}`}
      {...props}
    >
      {icon}
      {title}
    </button>
  );
};

export default NormalButton;
