import React, {useEffect, useState} from 'react';
import classes from './BlogsContainer.module.css'
import SecondaryButton from "../../buttons/SecondaryButton/SecondaryButton";
import TopPanel from "../../TopPanel/TopPanel";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../../components/ui/Preloader/Preloader";
import BlogsTable from "./BlogsTable/BlogsTable";
import BottomPanel from "../../BottomPanel/BottomPanel";
import {deleteBlogById, getAdminBlogById, getAdminBlogs} from "../../../store/adminSlices/adminBlogSlice";
import EditBlog from "./EditBlog/EditBlog";
import AddBlog from "./AddBlog/AddBlog";

const BlogsContainer = ({currentPage, setCurrentPage, amount, setAmount}) => {
    const [isOpenPopupEdit, setIsOpenPopupEdit] = useState(false);
    const [isOpenPopupAdd, setIsOpenPopupAdd] = useState(false);
    const {blogs: {data: blogsData, loading: blogsLoading}} = useSelector(state => state.admin.adminBlog);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminBlogs())
    }, [])

    const startIndex = (currentPage - 1) * amount;
    const displayedBlogs = blogsData.slice(startIndex, startIndex + amount);
    const handleClickEdit = (blogId) => {
        dispatch(getAdminBlogById(blogId))
        setIsOpenPopupEdit(true);
    }

    const handleDeleteBlogById = (blogId) => {
        dispatch(deleteBlogById(blogId))
            .then(() => dispatch(getAdminBlogs()))
    }
    return (
        <div className={classes.wrapper}>
            <TopPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={blogsData.length}
                setCurrentPage={setCurrentPage}
            >
                <SecondaryButton handleClick={() => setIsOpenPopupAdd(true)}>Додати статтю</SecondaryButton>
            </TopPanel>
            <BlogsTable blogsData={displayedBlogs} handleClickEdit={handleClickEdit} handleDeleteBlogById={handleDeleteBlogById}/>
            <EditBlog isOpenPopupEdit={isOpenPopupEdit} setIsOpenPopupEdit={setIsOpenPopupEdit}/>
            <AddBlog isOpenPopupAdd={isOpenPopupAdd} setIsOpenPopupAdd={setIsOpenPopupAdd}/>
            <BottomPanel
                currentPage={currentPage}
                amount={amount}
                totalCount={blogsData.length}
                setCurrentPage={setCurrentPage}
                setAmount={setAmount}
                amountTitle='Кількість показаних блогів'
            />
        </div>
    );
};

export default BlogsContainer;