

import styled from '@emotion/styled/macro';
import { TextInput, TextInputProps, createPolymorphicComponent } from '@mantine/core';
 import React, { ComponentProps, FC } from 'react';
 
 export interface IPropsTextInput extends TextInputProps {

 }
 type MyTextInputProp = Omit<ComponentProps<"input">, "ref" >& IPropsTextInput;

 const _StyledTextInput = styled(TextInput)``;
 const StyledTextInput = createPolymorphicComponent<'input', MyTextInputProp>(_StyledTextInput);

 const CustomTextInput : FC<MyTextInputProp> = React.forwardRef< HTMLButtonElement, MyTextInputProp>((props) => {
 
    return (
        <StyledTextInput
        withAsterisk
        {...props}
      /> 
    );
 });
 
 export default CustomTextInput;         