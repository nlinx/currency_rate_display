import { VStack, Flex, Text } from "@chakra-ui/react";

type Props = {
    currencyId: string;
    priceValidityTime: number;
    currencyPriceInUSD: number;
    totalCostInUSD: number;
}

const PriceSummary: React.FunctionComponent<Props> = (props) => {
    const totalCurrency = props.totalCostInUSD / props.currencyPriceInUSD
    return (
        <VStack spacing={1} w="full" h="full">
            <Flex w="full" justifyContent="space-between">
                <Text fontWeight="semibold">Summary</Text>
                {props.priceValidityTime === 0 ? (
                    <Text>Re-quoting</Text>
                ) : (
                    <Text>{`Valid for ${props.priceValidityTime}s`}</Text>
                )}
            </Flex>
            <Flex w="full" justifyContent="space-between">
                <Text fontWeight="semibold">{`${props.currencyId} Price`}</Text>
                <Text>{`$${props.currencyPriceInUSD.toFixed(2)}`}</Text>
            </Flex>
            <Flex w="full" justifyContent="space-between">
                <Text fontWeight="semibold">You get</Text>
                <Text>{`${totalCurrency.toFixed(5)} ${props.currencyId}`}</Text>
            </Flex>
            <Flex w="full" justifyContent="space-between">
                <Text fontWeight="semibold">Total</Text>
                <Text>{`$${props.totalCostInUSD.toFixed(2)}`}</Text>
            </Flex>
        </VStack>
    );
}

export default PriceSummary
