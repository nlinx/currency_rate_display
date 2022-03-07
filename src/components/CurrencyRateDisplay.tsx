import { useState, useEffect } from "react"
import {
    Container,
    VStack,
    Heading,
    Divider,
    Text,
    Spinner,
    Flex,
    usePrevious
} from "@chakra-ui/react";
import CurrencyForm from "./CurrencyForm";
import { CURRENCIES } from "../constants";
import PriceSummary from "./PriceSummary";
import { getCurrencyPriceInUSD } from "../utils";

const PRICE_REFRESH_TIME_IN_SECONDS = 30

const CurrencyRateDisplay: React.FunctionComponent<{}> = (props) => {
    // amount is set as a string in order to make working with the Chakra-UI 
    // NumberInput component easier
    const [amount, setAmount] = useState<string>("0")
    const [currencyId, setCurrencyId] = useState<string>(CURRENCIES[0].id)
    // If the time is 0 then we want to requote
    const [priceValidityTime, setPriceValidityTime] = useState<number>(0)
    // Set the initial state to -1 to indicate we haven't retrieved the price in USD yet
    const [currencyPriceInUSD, setCurrencyPriceInUSD] = useState<number>(-1)

    const prevCurrencyId = usePrevious(currencyId)

    // This hook will create a count down timer on component mount
    useEffect(() => {
        const intervalId = setInterval(() => {
            setPriceValidityTime((prevTime) => (prevTime - 1) >= 0 ? prevTime - 1 : 0)
        }, 1000, priceValidityTime)

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        // if priceValidityTime is zero or the currency changed
        if (priceValidityTime === 0 || prevCurrencyId !== currencyId) {
            getCurrencyPriceInUSD(currencyId).then(d => {
                setCurrencyPriceInUSD(() => parseFloat(d.data.amount))
                setPriceValidityTime(() => PRICE_REFRESH_TIME_IN_SECONDS)
            })
        }
    }, [priceValidityTime, currencyId, prevCurrencyId])

    return (
        <Container
            maxW="440px"
            p={0}
            boxShadow="md"
            bgColor="white"
            border="1px"
            borderColor="gray.200"
            borderRadius={12}>
            {currencyPriceInUSD >= 0 ? (
                <VStack w="full" h="full" spacing={10} padding={10}>
                    <VStack spacing={1} w="full" alignItems="flex-start">
                        <Heading size="lg">Currency Rate</Heading>
                        <Text>Select a currency and amount to convert to USD.</Text>
                        <Divider />
                    </VStack>
                    <CurrencyForm
                        amount={amount}
                        currencyId={currencyId}
                        onCurrencyChange={(v) => setCurrencyId(v)}
                        onAmountChange={(v) => setAmount(v)} />
                    <PriceSummary
                        currencyId={currencyId}
                        priceValidityTime={priceValidityTime}
                        currencyPriceInUSD={currencyPriceInUSD}
                        totalCostInUSD={amount ? parseFloat(amount) : 0}
                    />
                </VStack>
            ) : (
                <Flex h="full" alignItems="center" justifyContent="center">
                    <Spinner size="xl" />
                </Flex>
            )}
        </Container>
    );
}

export default CurrencyRateDisplay
