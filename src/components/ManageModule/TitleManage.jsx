const TitleManage = ({ title, className }) => {
  return (
    <div className={`pb-2 border-b border-lightest-gray ${className}`}>
      <h3 className='text-2xl font-semibold uppercase'>{title}</h3>
    </div>
  );
};

export default TitleManage;
