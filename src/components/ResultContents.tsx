import { Box } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  result: string | undefined;
};

export const ResultContents = ({ result }: Props) => {
  return (
    <Box>
      <SyntaxHighlighter style={vscDarkPlus}>
        {result ? result : "ここに結果が表示されます"}
      </SyntaxHighlighter>
    </Box>
  );
};
