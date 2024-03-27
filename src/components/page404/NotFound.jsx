import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Wrapper>
      <Content>
        <Title>Sorry, the page you are looking for couldn't be found.</Title>
        <Message>
          Please go back to the <StyledLink to="/">home page</StyledLink> and
          try again. If it still doesn't work for you, please reach out to our
          team at <ContactLink href="#">adem.se2010@gmail.com</ContactLink>.
        </Message>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: #fafafa;
  padding-top: 150px;
  padding-bottom: 150px;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: 576px;
  padding: 0 20px;
`;

const Title = styled.h2`
  text-align: left;
  color: #333;
`;

const Message = styled.p`
  text-align: left;
  margin-top: 20px;
  color: #666;
`;

const StyledLink = styled(Link)`
  color: #fe8082;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ContactLink = styled.a`
  color: #f6912b;
`;

export default NotFound;
