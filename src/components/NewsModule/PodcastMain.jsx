import PodcastPlayer from './PodcastPlayer';

const PodcastMain = () => {
  return (
    <div className="w-full flex flex-col items-center mb-4 ">
      <div className="max-w-md mb-8">
        <img
          src="https://i.scdn.co/image/ab6765630000ba8aa4bc8090b95df07acf15b51e"
          className="rounded-2xl shadow-2xl"
        />
      </div>
      <div className="w-full max-w-md flex flex-col items-start ">
        <span className="my-1 text-xs font-semibold uppercase line-clamp-1 text-[#0c5dff]">
          Vietnam Innovators (Tiếng Việt)
        </span>
        <h3 className="my-2.5 text-2xl font-semibold line-clamp-3">
          S3#15 Alex Phạm, CEO & Co-founder, Realbox: Bất động sản phân mảnh -
          cơ hội đầu tư cho số đông
        </h3>
      </div>
      <div className="w-full max-w-md">
        <PodcastPlayer />
      </div>
    </div>
  );
};

export default PodcastMain;
