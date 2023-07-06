import { useSelector } from "react-redux";

import Blog from "./Blog";

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
      .map(b => b)
      .sort((a, b) => b.likes - a.likes)
  })

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default Blogs;
