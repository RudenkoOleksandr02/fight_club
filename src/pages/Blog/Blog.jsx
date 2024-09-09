import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getBlogById} from "../../store/pageSlices/blogPageSlice";
import classes from './Blog.module.css';
import Preloader from "../../components/ui/Preloader/Preloader";
import CardListWithSwap from "../../components/containers/CardListWithSwap/CardListWithSwap";
import BannerBlock from "../../components/ui/blocks/BannerBlock/BannerBlock";

const Blog = () => {
    const dispatch = useDispatch();
    const {data: blogData, loading: blogLoading} = useSelector(state => state.blogPage.blog);
    const blogId = useParams().id

    useEffect(() => {
        dispatch(getBlogById(blogId))
    }, [blogId])

    if (blogLoading) return <Preloader cover={true} color='secondary'/>

    return (
        <div className={classes.wrapper}>
            <p className={classes.title}>{blogData.title}</p>
            <BannerBlock
                text={blogData.description}
                images={{
                    desktopImage: blogData.desktopImageUrl,
                    laptopImage: blogData.laptopImageUrl,
                    tabletImage: blogData.tabletImageUrl,
                    phoneImage: blogData.phoneImageUrl,
                    altText: blogData.altText
                }}
            />
            <div className={classes.products}>
                {!!blogData.products?.length && (
                    <CardListWithSwap title='Добірка товарів з цього блогу' products={blogData.products}/>
                )}
            </div>
        </div>
    );
};

export default Blog;