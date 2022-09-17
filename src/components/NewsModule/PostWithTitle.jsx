const PostWithTitle = () => {
  return (
    // Container
    <div className="mb-6 md:mb-1 flex">
      {/* Number */}
      <span className="font-merriweather font-semibold text-dark-gray-bg mr-4 md:mr-8 w-[30px] md:w-[48px] text-[40px] md:text-[56px] leading-10 md:leading-[56px]">
        1
      </span>

      {/* Article */}
      <article className="flex items-center justify-start w-full md:mb-8">
        <div className="flex-[0_0_50%] md:flex-[0_0_32%] h-auto mr-2 md:mr-4">
          <img
            src="https://img.vietcetera.com/uploads/images/05-sep-2022/nhatky-guide-1662368203405.jpg"
            className="w-full h-full rounded-lg aspect-video"
          />
        </div>
        <div className="flex-[0_0_50%] md:flex-auto w-full ml-2 md:ml-4">
          <h3 className="text-base md:text-xl text-primary-bg font-semibold line-clamp-3 mb-2 md:mb-4 ">
            Mình từng bị giáo viên chủ nhiệm “trù” cả 4 năm
          </h3>
        </div>
      </article>
    </div>
  );
};

export default PostWithTitle;
