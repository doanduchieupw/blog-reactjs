const TitleSection = ({ firstWord, secondWord }) => {
  return (
    <div className="flex items-end justify-between mb-6 xs:mb-4">
      <h2 className='uppercase text-2xl leading-8 font-bold'>
        {firstWord} <br /> {secondWord}
      </h2>
    </div>
  );
};

export default TitleSection;
