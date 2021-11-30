import React from 'react';
//styles
import { Wrapper, Content, Text } from './HomeImage.styles';
//Types
type Props = {
  image: string,
  title: string,
  text: string,
}
// вместо обращения к ключам пропса, лучше использовать деструктуризацию и сразу передавать
// нужные ключи. Так гораздо читабельнее и это ES6 синтакс
const HeroImage: React.FC<Props> = ({ image, title, text }) => {
  return (
    <Wrapper image={image}>
      <Content>
        <Text>
          <h1>{title}</h1>
          <p>{text}</p>
        </Text>
      </Content>
    </Wrapper>
  )
};

export default HeroImage;
