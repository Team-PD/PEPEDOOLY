import styled from "styled-components";

const ContentContainer = styled.div`
  max-width: 900px;
  margin: auto;
  font-size: 16px;
  line-height: 1.6;
  height: 400px;
  border: 1px solid black;
  margin-bottom: 40px;
  color: #333;
`;

const Image = styled.img`
  max-width: 30%;
  min-width: 30%;
  max-height: 70%;
  min-height: 70%;
  height: auto;
`;

const Content = ({ noticeContent, images }) => (
  <ContentContainer>
    <p>{noticeContent}</p>
    {images &&
      images.map((image, index) => (
        <Image key={index} src={image.imageUrl} alt={`Image ${index}`} />
      ))}
  </ContentContainer>
);

export default Content;
