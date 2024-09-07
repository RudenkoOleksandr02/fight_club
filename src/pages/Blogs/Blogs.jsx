import React, { useEffect } from 'react';
import classes from './Blogs.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../store/pageSlices/blogPageSlice";
import Preloader from "../../components/ui/Preloader/Preloader";
import BlogItem from "./BlogItem/BlogItem";

const Blogs = () => {
    const dispatch = useDispatch();
    const { data: blogs, loading } = useSelector(state => state.blogPage.blogs);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    if (loading) {
        return <Preloader cover={true} color='secondary' />;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.blogList}>
                {blogs.map(blog => (
                    <BlogItem
                        key={blog.blogId}
                        title={blog.title}
                        blogId={blog.blogId}
                        images={{
                            desktopImage: blog.desktopImageUrl,
                            laptopImage: blog.laptopImageUrl,
                            tabletImage: blog.tabletImageUrl,
                            phoneImage: blog.phoneImageUrl,
                            altText: blog.desktopAltText
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
