// Info.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserState } from "../../../hooks/useUserState";
import FieldContainer from "./FieldContainer";
import ButtonContainer from "./ButtonContainer";
import styled from "styled-components";

const ADMIN_EDIT_URL = `http://localhost:4000/admin/edit`;
const ADMIN_IMAGE_URL = `http://localhost:4000/admin/image`;

const Info = ({ isEdit }) => {
  const [isEditState, setIsEdit] = useState(isEdit);
  const [imageUrl, setImageUrl] = useState("");
  const [fields, setFields] = useState([]);
  const { user, setLoggedInUser } = useUserState();
  const { Admin_id, Admin_name, Admin_nickname, Admin_uid } =
    (user && user.userData) || {};

  useEffect(() => {
    if (user) {
      setFields([
        { id: 1, label: "Admin_id", value: Admin_id || "" },
        { id: 2, label: "Admin_name", value: Admin_name || "" },
        { id: 3, label: "Admin_nickname", value: Admin_nickname || "" },
        { id: 4, label: "Admin_password", value: "", isPassword: true },
      ]);
    }
  }, [user]);

  const handleInputChangeLocal = (id, value) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleEditClick = () => {
    if (isEditState) {
      const formData = createFormData();
      updateAdminInfo(formData);
    }
    setIsEdit(!isEditState);
  };

  const createFormData = () => {
    const formData = new FormData();
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput ? fileInput.files[0] : null;
    if (file) {
      formData.append("image", file);
    }
    formData.append("id", Admin_id);
    formData.append("name", Admin_name);
    formData.append("uid", Admin_uid);
    fields.forEach((field) => {
      if (field.label) {
        formData.append(field.label, field.value);
      }
    });
    return formData;
  };

  const updateAdminInfo = (formData) => {
    axios
      .put(ADMIN_EDIT_URL, formData, {
        withCredentials: true,
      })
      .then((response) => {
        setFields(response.data);
        setLoggedInUser(response.data);
      })
      .catch((error) => {
        console.error("Error updating admin info:", error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(ADMIN_IMAGE_URL, formData)
      .then((response) => {
        setImageUrl(response.data.imageUrl);
      })
      .catch((error) => {
        console.error("Error updating image:", error);
      });
  };

  return (
    <>
      <Container>
        <FieldContainerWrapper>
          <FieldContainer
            admin={user && user.userData}
            isEdit={isEditState}
            fields={fields}
            handleInputChangeLocal={handleInputChangeLocal}
            handleImageChange={handleImageChange}
          />
        </FieldContainerWrapper>
        <ButtonContainer
          isEdit={isEditState}
          handleEditClick={handleEditClick}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FieldContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Info;
