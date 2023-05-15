
import React, { ReactNode } from "react";
import {TbMoonStars,TbSun} from 'react-icons/tb'

// const Header = ()=>{
//     const { colorScheme, toggleColorScheme } = useMantineColorScheme();
//     return (
//         <ActionIcon  onClick={() => toggleColorScheme()}>
//             {colorScheme === 'dark' ? <TbSun /> : <TbMoonStars />}
//         </ActionIcon>
//     )
// }

const App = ({children}:{children:ReactNode}) => {
    // const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    //     key: 'color-scheme',
    //     defaultValue: 'light',
    //     getInitialValueInEffect: true,
    //   });
    
    // const toggleColorScheme = () =>
    //     setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
    
    return (
        <> {children}</>
        // <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            // {/* <MantineProvider  theme={{ colorScheme }} withGlobalStyles withNormalizeCSS> */}
                // {/* <Header/> */}
            //    
            // </MantineProvider>
        // </ColorSchemeProvider>
    )
}

export default App