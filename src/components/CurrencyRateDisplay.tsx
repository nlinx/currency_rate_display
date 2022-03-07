import {
    Container,
    VStack,
    Heading,
    Divider,
    Text,
    Spinner,
    Flex,
} from "@chakra-ui/react";
import CurrencyForm from "./CurrencyForm";
import PriceSummary from "./PriceSummary";


const CurrencyRateDisplay: React.FunctionComponent<{}> = (props) => {
    return (
        <Container
            maxW="440px"
            p={0}
            boxShadow="md"
            bgColor="white"
            border="1px"
            borderColor="gray.200"
            borderRadius={12}>
            {true ? (
                <VStack w="full" h="full" spacing={10} padding={10}>
                    <VStack spacing={1} w="full" alignItems="flex-start">
                        <Heading size="lg">Currency Rate</Heading>
                        <Text>Select a currency and amount to convert to USD.</Text>
                        <Divider />
                    </VStack>
                    <CurrencyForm />
                    <PriceSummary />
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
