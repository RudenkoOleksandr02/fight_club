import React, {useEffect, useState} from 'react';
import Files from 'react-files';
import classes from './FileDropzone.module.css';
import {ReactComponent as IcoLoadFile} from './../images/icoLoadFile.svg';
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import {ReactComponent as IcoDelete} from './../images/icoDelete.svg';

const FileDropzone = ({ accepts, handleSend, maxFiles = 1, isError, isSuccess, setIsError, setIsSuccess }) => {
    const [files, setFiles] = useState([]);
    const [isSent, setIsSent] = useState(false)

    const handleChange = (newFiles) => {
        setFiles(prevFiles => {
            const allFiles = [...prevFiles, ...newFiles];
            if (allFiles.length > maxFiles) {
                return allFiles.slice(allFiles.length - maxFiles);
            }
            return allFiles;
        });
    }

    const handleFileRemove = (fileId) => {
        setFiles(prevFiles => prevFiles.filter(prevFile => prevFile.id !== fileId));
    }

    const handleUploadFiles = () => {
        handleSend(files);
        setIsSent(true)
    }

    useEffect(() => {
        if (isSent && isSuccess) {
            setFiles([]);
            setIsSent(false)
        }
    }, [isSuccess, isSent]);
    useEffect(() => {
        if (files.length !== 0) {
            setIsError(false);
            setIsSuccess(false);
        }
    }, [files.length])

    return (
        <div className={classes.filesContainer}>
            <Files
                className={classes.filesDropzone}
                dragActiveClassName={classes.filesDropzoneActive}
                onChange={handleChange}
                accepts={accepts}
                multiple={maxFiles > 1}
                maxFiles={maxFiles}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
            >
                <div className={classes.dropzoneContent}>
                    <IcoLoadFile/>
                    <p>Перетягніть файли сюди або натисніть, щоб завантажити</p>
                </div>
            </Files>
            <PrimaryButton handleClick={handleUploadFiles}>Завантажити на сервер</PrimaryButton>
            {files.length > 0 && (
                <div className={classes.filesList}>
                    <ul>
                        {files.map(file => (
                            <li key={file.id}>
                                <div className={classes.inner1}>
                                    <div className={classes.previewExtension}>{file.extension}</div>
                                    <div className={classes.contentItem}>
                                        <div>{file.name}</div>
                                        <div>{file.sizeReadable}</div>
                                    </div>
                                </div>
                                <div className={classes.inner2}>
                                    <button
                                        className={classes.itemRemove}
                                        onClick={() => handleFileRemove(file.id)}
                                    ><IcoDelete/></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {isError && (
                <p className={classes.error}>ПОМИЛКА</p>
            )}
            {isSuccess && files.length === 0 && (
                <p className={classes.success}>УСПІХ</p>
            )}
        </div>
    );
};

export default FileDropzone;
