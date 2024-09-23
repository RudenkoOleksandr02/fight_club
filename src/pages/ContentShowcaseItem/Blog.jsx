import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getBlogById} from "../../store/pageSlices/blogPageSlice";
import classes from './ContentShowcaseItem.module.css';
import Preloader from "../../components/ui/Preloader/Preloader";
import CardListWithSwap from "../../components/containers/swipers/CardListWithSwap/CardListWithSwap";
import BannerBlock from "../../components/ui/blocks/BannerBlock/BannerBlock";
import Breadcrumbs from "../../components/ui/Breadcrumbs/Breadcrumbs";

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
            <div className={classes.breadCrumbs}>
                <Breadcrumbs links={[
                    {id: '/blogs', name: 'Блог'},
                    {id: `/blogs/${blogId}`, name: blogData.title}
                ]}/>
            </div>
            <p className={classes.title}>{blogData.title}</p>
            <div className={classes.banner}>
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
            </div>
            <div className={classes.products}>
                {!!blogData.products?.length && (
                    <CardListWithSwap title='Добірка товарів з цього блогу' products={blogData.products}/>
                )}
            </div>
        </div>
    );
};

export default Blog;