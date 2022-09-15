import { NewestBlog } from "../components/NewsType";
import ExploreBlog from "../components/NewsType/ExploreBlog";

const Home = () => {
    return <div className="w-[90%] max-w-6xl mx-auto">
        <NewestBlog />
        <ExploreBlog />
    </div>;
};

export default Home;

