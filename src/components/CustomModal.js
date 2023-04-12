import React from "react";
import { Modal, Button } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="Thông báo"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      footer={[
        <Button key="close" onClick={hideModal}>
          Đóng
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={performAction}
          style={{ background: "blue" }}
        >
          Chấp nhận
        </Button>,
      ]}
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
