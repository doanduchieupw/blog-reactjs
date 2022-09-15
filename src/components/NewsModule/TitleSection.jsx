const TitleSection = ({ firstWord, secondWord }) => {
  return (
    <div className="flex items-end justify-between mb-6 xs:mb-4">
      <h2 className='uppercase text-2xl xs:text-[40px] leading-8 xs:leading-[1.2em] font-bold'>
        {firstWord} <br /> {secondWord}
      </h2>
    </div>
  );
};

export default TitleSection;
