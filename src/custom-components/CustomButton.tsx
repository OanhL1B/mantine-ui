

import styled from '@emotion/styled';
import {
  Button,
  ButtonProps,
  Variants,
  createPolymorphicComponent,
} from "@mantine/core";
import React, { ComponentProps, FC } from "react";

interface IProps extends ButtonProps {
  variant: ButtonProps["variant"] & Variants<"add" | "delete">;
}

type MyButtonProps = Omit<ComponentProps<"button">, "ref" >& IProps;

const _StyledButton = styled(Button)``;

const StyledButton = createPolymorphicComponent<'button', MyButtonProps>(_StyledButton);


const ButtonCustom: FC<MyButtonProps> = React.forwardRef< HTMLButtonElement, MyButtonProps>((props, ref) => {
  return (<StyledButton {...props} ref={ref} />);
});

export default ButtonCustom;
