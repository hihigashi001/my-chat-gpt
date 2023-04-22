import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {
  onClear: () => void;
};

export const Footer = ({ onClear }: Props) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading size="sm">Created by higashionna@2022.4</Heading>
      <Button colorScheme="red" onClick={onClear}>
        x Clear
      </Button>
    </Flex>
  );
};
