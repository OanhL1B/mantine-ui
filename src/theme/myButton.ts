import {MantineThemeComponents} from"@mantine/styles/lib/theme/types/MantineTheme"


 export const myButton:MantineThemeComponents['Button'] = {    
        variants: {
          add: (theme) => ({
            root: {
              backgroundColor: theme.colors.blue[6],
              color: theme.white,
              ...theme.fn.hover({ backgroundColor: theme.colors.blue[8] }),
            },
          }),

          delete: (theme) => ({
            root: {
              backgroundColor: theme.colors.red[4] ,
              color: theme.white,
              ...theme.fn.hover({ backgroundColor: theme.colors.red[6] }),

            },
          }),
        },
        sizes: {
          xl: () => ({
            root: {
              height: '32px',
              width: "74px",
              padding: '10px',
              fontSize: '12px',
            },
          }),

          xxl: () => ({
            root: {
              height: '40px',
              width: "90px",
              padding: '10px',
            },
          }),
        },
      }



   