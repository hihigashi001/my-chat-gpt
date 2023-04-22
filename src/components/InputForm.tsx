import { FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import React from "react";

type Props = {
  errors: any;
  register: any;
};

export const InputForm = ({ errors, register }: Props) => {
  return (
    <form>
      <FormControl isInvalid={!!errors.inputText}>
        <Textarea
          placeholder="Send a message..."
          rows={5}
          {...register("inputText", { required: true })}
        />
        {errors.inputText && <FormErrorMessage>入力必須です。</FormErrorMessage>}
      </FormControl>
    </form>
  );
};
