import React from 'react';
import { Link } from 'react-router-dom';
//style
import { Wrapper, Content } from './BreadCrumb.style';
// Types
type Props = {
  movieTitle: string,
}

const BreadCrumb: React.FC<Props> = ({ movieTitle }) => (
  <Wrapper>
    <Content>
      <Link to='/'>
        <span>Home</span>
      </Link>
      <span>|</span>
      <span>{movieTitle}</span>
    </Content>
  </Wrapper>
);

export default BreadCrumb;
