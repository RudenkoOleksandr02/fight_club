import React, {useState} from 'react';
import Table from "../../../Table/Table";
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import classes from "./BlogsTable.module.css";
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import {ReactComponent as IcoEdit} from './../../../images/icoEdit.svg';
import {ReactComponent as IcoDelete} from './../../../images/icoDelete.svg';
import {useSelector} from "react-redux";
import Preloader from "../../../../components/ui/Preloader/Preloader";
import PopupForDelete from "../../../PopupForDelete/PopupForDelete";

const BlogsTable = ({blogsData, handleClickEdit, handleDeleteBlogById}) => {
    const {blogs: {loading: blogsLoading}} = useSelector(state => state.admin.adminBlog);
    const [deleteBlogId, setDeleteBlogId] = useState(null);

    return (
        <Table>
            <Tr templateColumns='1fr 130px'>
                <Td fontWeight='600' justifyContent='left'>Заголовок блогу</Td>
                <Td fontWeight='600'>Дії</Td>
            </Tr>
            {blogsLoading ? <Preloader color='primary'/> : (
                blogsData.map(blog => (
                    <Tr key={blog.blogId} templateColumns='1fr 130px'>
                        <Td justifyContent='left'>{blog.title}</Td>
                        <Td>
                            <div className={classes.icoBtns}>
                                <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(blog.blogId)}/>
                                <IcoButton svgIco={<IcoDelete/>} onClick={() => setDeleteBlogId(blog.blogId)}/>
                            </div>
                        </Td>
                        {deleteBlogId === blog.blogId && (
                            <PopupForDelete
                                message={`Видалити блог: ${blog.title}`}
                                onDelete={() => {
                                    handleDeleteBlogById(blog.blogId);
                                    setDeleteBlogId(null);
                                }}
                                onCancel={() => setDeleteBlogId(null)}
                            />
                        )}
                    </Tr>
                ))
            )}
        </Table>
    );
};

export default BlogsTable;