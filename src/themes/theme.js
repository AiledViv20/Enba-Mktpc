import { extendTheme } from '@chakra-ui/react'
import "cal-sans";

const theme = extendTheme({
  fonts: {
    heading: `'Cal Sans', sans-serif`,
    body: `'Cal Sans', sans-serif`,
  },
})

export default theme