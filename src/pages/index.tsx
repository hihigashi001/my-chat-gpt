import { Box, Center, Spinner } from "@chakra-ui/react";
import { ResultContents } from "@/components/ResultContents";
import { ButtonGroups } from "@/components/Buttons";
import { InputForm } from "@/components/InputForm";
import { useInputForm } from "@/hooks/useInputForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  const {
    handleOnClear,
    register,
    errors,
    isValid,
    result,
    BUTTON_GROUPS,
    isLoading,
    AccordionIndex,
    handleAccordionIndex,
  } = useInputForm();

  if (isLoading)
    return (
      <Box maxW="4xl" mx="auto" my={100}>
        <Center>
          <Spinner />
        </Center>
      </Box>
    );

  return (
    <Box maxW="4xl" mx="auto" my={25}>
      <InputForm errors={errors} register={register} />
      <ButtonGroups
        BUTTON_GROUPS={BUTTON_GROUPS}
        isValid={isValid}
        AccordionIndex={AccordionIndex}
        handleAccordionIndex={handleAccordionIndex}
      />
      <ResultContents result={result} />
      <Footer onClear={handleOnClear} />
    </Box>
  );
}
