import { Text, Title } from "@mantine/core";
import { FC } from "react";

interface IProps {
  title: string;
}

const Header: FC<IProps> = ({ title }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Text color="#2d3748" size={14}>
        Pages / {title}
      </Text>
      <Title color="#1b254b">{title}</Title>
    </div>
  );
};

export default Header;
