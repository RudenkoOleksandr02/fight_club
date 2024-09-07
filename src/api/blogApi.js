import {instance, BlogUrls} from "./urls/apiUrls";

const BlogApi = {
    getBlogs() {
        return instance.get(BlogUrls.GetBlogs)
            .then(response => response.data)
    },
    getBlogById(blogId) {
        return instance.get(BlogUrls.GetBlogById(blogId))
            .then(response => {
                return response.data
            })
    }
}

export default BlogApi;