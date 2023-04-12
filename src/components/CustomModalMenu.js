import React from "react";
import { Modal } from "antd";
import { Editor } from "react-draft-wysiwyg";

const CustomModalMenu = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="Nhập Thông Tin"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <Editor/>
    </Modal>
  );
};

export default CustomModalMenu;
