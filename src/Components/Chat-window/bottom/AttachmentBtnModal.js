/* eslint-disable import/no-extraneous-dependencies */
import { file } from '@babel/types';
import React, { useState } from 'react'
import { useParams } from 'react-router';
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite'
import { useModalState } from '../../../misc/custom-hook'
import { storage } from '../../../misc/firebase';

const MAX_FILE_SIZE = 1000 * 1024 * 5;

function AttachmentBtnModal({afterUpload}) {
    const {chatId}=useParams();
    const {isOpen,close,open}=useModalState();
    const [fileList,setFileList]=useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const onChange = fileArr => {
        const filtered = fileArr
          .filter(el => el.blobFile.size <= MAX_FILE_SIZE)
          .slice(0, 5);
        setFileList(filtered);
      };
      const onUpload = async () => {
        try {
          const uploadPromises = fileList.map(f => {
            return storage
              .ref(`/chat/${chatId}`)
              .child(Date.now() + file.name)
              .put(f.blobFile, {
                cacheControl: `public, max-age=${3600 * 24 * 3}`,
              });
          });
    
          const uploadSnapshots = await Promise.all(uploadPromises);
          const shapePromises = uploadSnapshots.map(async snap => {
            return {
              contextType: snap.metadata.contentType,
              name: snap.metadata.name,
              url: await snap.ref.getDownloadURL(),
            };
          });
    
          const files = await Promise.all(shapePromises);
          await afterUpload(files);
          setIsLoading(false);
          close();
        } catch (err) {
          setIsLoading(false);
          Alert.error(err.message, 4000);

        }
      };
  return (
    <>
      <InputGroup.Button color="green" onClick={open}>
        <Icon icon="upload" />
      </InputGroup.Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            autoUpload={false}
            action=""
            fileList={fileList}
            onChange={onChange}
            multiple
            listType="picture-text"
            disabled={isLoading}
            className="w-100"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block disabled={isLoading} onClick={onUpload}>
            Send to Chat
          </Button>
          <div className="text-right mt-2">
            Only Files less then 5 MB are Allowed
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AttachmentBtnModal
