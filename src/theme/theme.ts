import {  MantineThemeOverride } from "@mantine/core";
import { myButton } from "./myButton";
import { myBadge } from "./myBadge";
import { myColor } from "./myColor";

export const myTheme: MantineThemeOverride = {

        components: {
          Button: myButton,
          Badge: myBadge
        },
        colors:myColor,
       
    }
  



