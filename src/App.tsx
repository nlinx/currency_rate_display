import * as React from "react"
import {
  ChakraProvider,
  Grid,
  theme,
} from "@chakra-ui/react"
import CurrencyRateDisplay from "./components/CurrencyRateDisplay"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Grid minH="100vh" p={6} bgColor="gray.100">
      <CurrencyRateDisplay />
    </Grid>
  </ChakraProvider>
)
