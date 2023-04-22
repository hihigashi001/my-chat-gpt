import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Grid,
  Heading,
} from "@chakra-ui/react";

type ButtonType = {
  label: string;
  onClick: () => void;
  colorScheme: string;
};
type ButtonsType = {
  buttons: ButtonType[];
  label: string;
};

type ButtonGroupType = {
  BUTTON_GROUPS: ButtonsType[];
  isValid: boolean;
  AccordionIndex: 0 | 1;
  handleAccordionIndex: () => void;
};
type ButtonsProps = {
  buttons: ButtonType[];
  isValid: boolean;
};

export const ButtonGroups = ({
  BUTTON_GROUPS,
  isValid,
  AccordionIndex,
  handleAccordionIndex,
}: ButtonGroupType) => {
  return (
    <Accordion index={AccordionIndex} onClick={handleAccordionIndex}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Action Buttons
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {BUTTON_GROUPS.map((group) => (
            <Box key={group.label} my={4}>
              <Heading size="md" mb={2}>
                {group.label}
              </Heading>
              <Buttons buttons={group.buttons} isValid={isValid} />
            </Box>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const Buttons = ({ buttons, isValid }: ButtonsProps) => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap={4}>
      {buttons.map(({ label, onClick, colorScheme }) => (
        <Button key={label} colorScheme={colorScheme} onClick={onClick} disabled={!isValid}>
          {label}
        </Button>
      ))}
    </Grid>
  );
};
