import React from 'react';
import classes from './../Item.module.css';
import {useNavigate} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";

const BlogItem = ({title, images, blogId, metaKeywords, metaDescription}) => {
    const navigate = useNavigate()

    return (
        <HelmetProvider>
            <Helmet>
                <title>BLOSSOM</title>
                <meta name="description"
                      content={metaDescription !== null ? metaDescription : ''}
                />
                <meta name="keywords"
                      content={metaKeywords !== null ? metaKeywords : ''}
                />
            </Helmet>
            <div className={classes.wrapper} onClick={() => navigate(`/blogs/${blogId}`)}>
                <div className={classes.imageWrapper}>
                    <picture>
                        <source
                            media="(min-width: 1360px)"
                            srcSet={images.desktopImage}
                        />
                        <source
                            media="(min-width: 1000px) and (max-width: 1359px)"
                            srcSet={images.laptopImage}
                        />
                        <source
                            media="(min-width: 768px) and (max-width: 999px)"
                            srcSet={images.tabletImage}
                        />
                        <source
                            media="(max-width: 767px)"
                            srcSet={images.phoneImage}
                        />
                        <img
                            src={images.desktopImage}
                            alt={images.altText}
                            className={classes.image}
                        />
                    </picture>
                </div>
                <p className={classes.title}>{title}</p>
            </div>
        </HelmetProvider>
    );
};

export default BlogItem;
