import {
    VStack,
    FormControl,
    FormLabel,
    Select,
    Flex,
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";
import { CURRENCIES } from "../constants";

type Props = {
    currencyId: string;
    amount: string;
    onCurrencyChange: (value: string) => void;
    onAmountChange: (value: string) => void;
}

const CurrencyForm: React.FunctionComponent<Props> = (props) => {
    return (
        <VStack spacing={4} w="full">
            <FormControl>
                <FormLabel>Currency</FormLabel>
                <Select
                    backgroundColor="gray.100"
                    value={props.currencyId}
                    onChange={(e) => {
                        props.onCurrencyChange(e.target.value)
                    }}>
                    {CURRENCIES.map((currency, i) => (
                        <option key={i} value={currency.id}>{currency.name}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <Flex justifyContent="space-between">
                    <FormLabel>
                        <Text>Amount</Text>
                    </FormLabel>
                    <Text>{`${props.currencyId} / USD`}</Text>
                </Flex>
                <NumberInput
                    value={props.amount}
                    min={0}
                    onChange={(amount) => {
                        props.onAmountChange(amount)
                    }}>
                    <NumberInputField backgroundColor="gray.100" />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        </VStack>
    );
}

export default CurrencyForm
