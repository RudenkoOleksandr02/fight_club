import React from 'react';
import Table from "../../../Table/Table";
import Tr from "../../../Table/Tr";
import Td from "../../../Table/Td";
import classes from "./BlogsTable.module.css";
import IcoButton from "../../../buttons/IcoButton/IcoButton";
import {ReactComponent as IcoEdit} from './../../../images/icoEdit.svg';
import {ReactComponent as IcoDelete} from './../../../images/icoDelete.svg';

const BlogsTable = ({blogsData, handleClickEdit}) => {
    return (
        <Table>
            <Tr templateColumns='1fr 130px'>
                <Td fontWeight='600' justifyContent='left'>Заголовок блогу</Td>
                <Td fontWeight='600'>Дії</Td>
            </Tr>
            {blogsData.map(blog => (
                <Tr key={blog.blogId} templateColumns='1fr 130px'>
                    <Td justifyContent='left'>{blog.title}</Td>
                    <Td>
                        <div className={classes.icoBtns}>
                            <IcoButton svgIco={<IcoEdit/>} onClick={() => handleClickEdit(blog.blogId)}/>
                            <IcoButton svgIco={<IcoDelete/>}/>
                        </div>
                    </Td>
                </Tr>
            ))}
        </Table>
    );
};

export default BlogsTable;