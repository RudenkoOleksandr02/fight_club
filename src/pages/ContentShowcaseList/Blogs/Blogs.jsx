import React, {useEffect} from 'react';
import classes from './../ContentShowcaseList.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getBlogs} from "../../../store/pageSlices/blogPageSlice";
import Preloader from "../../../components/ui/Preloader/Preloader";
import BlogItem from "./BlogItem";
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs";
import AbsenceBlock from "../../../components/ui/blocks/AbsenceBlock/AbsenceBlock";

const Blogs = () => {
    const dispatch = useDispatch();
    const {data: blogs, loading} = useSelector(state => state.blogPage.blogs);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    if (loading) {
        return <Preloader cover={true} color='secondary'/>;
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.breadCrumbs}>
                <Breadcrumbs
                    links={[{
                        id: '/blogs',
                        name: 'Блог'
                    }]}
                />
            </div>
            {!!blogs.length ? (
                <div className={classes.list}>
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
                                altText: blog.altText
                            }}
                        />
                    ))}
                </div>
            ) : (
                <AbsenceBlock title='Список блогів порожній'
                              text="Здається, тут ще немає блогів. Можливо, вони з'являться трохи пізніше."/>
            )}
        </div>
    );
};

export default Blogs;
