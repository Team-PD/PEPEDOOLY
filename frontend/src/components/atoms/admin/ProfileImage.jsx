import styled from "styled-components";

const StyledImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 20px;
`;

const ProfileImage = ({ onImageChange, admin, isEdit }) => {
  const imageUrl = admin
    ? admin.Admin_profile /* .replace(/\\/g, "/") */
    : null;
  return (
    <div>
      {imageUrl && (
        <StyledImg id="profile-img" class="user-pfp" src={imageUrl} />
      )}
      {isEdit && <input type="file" onChange={onImageChange} />}
    </div>
  );
};

export default ProfileImage;
