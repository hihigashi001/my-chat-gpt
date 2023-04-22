import { useState } from "react";
import { useForm } from "react-hook-form";

type SubmitProps = {
  systemContent: string;
  userContent: string;
};

export const useInputForm = () => {
  const [AccordionIndex, setAccordionIndex] = useState<0 | 1>(0);
  const [result, setResult] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    reset,
    formState: { errors, isValid },
    getValues,
  } = useForm();

  const onSubmit = async ({ systemContent, userContent }: SubmitProps) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputText: getValues("inputText"),
          systemContent: systemContent,
          userContent: userContent,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAccordionIndex(1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClear = () => {
    reset();
    setResult(undefined);
    setAccordionIndex(0);
  };

  const handleAccordionIndex = () => {
    setAccordionIndex(AccordionIndex === 0 ? 1 : 0);
  };

  const BUTTON_GROUPS = [
    {
      label: "文書作成",
      buttons: [
        {
          label: "アイテムを5個作成",
          onClick: () =>
            onSubmit({
              systemContent: "あなたは5個アイデアを出力することができます。",
              userContent: "入力値を受け取り、5個アイデアを出力する。",
            }),
          colorScheme: "blue",
        },
        {
          label: "アイテムを10個作成",
          onClick: () =>
            onSubmit({
              systemContent: "あなたは10個アイデアを出力することができます。",
              userContent: "入力値を受け取り、10個アイデアを出力する。",
            }),
          colorScheme: "blue",
        },
        {
          label: "メールの送信",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはメールの送信を出力することができます。",
              userContent: "入力値を受け取り、メールの送信内容を出力する。",
            }),
          colorScheme: "blue",
        },
        {
          label: "メールの返信",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはメールの返信を出力することができます。",
              userContent: "入力値を受け取り、メールの返信内容を出力する。",
            }),
          colorScheme: "blue",
        },
      ],
    },
    {
      label: "コーディング関連",
      buttons: [
        {
          label: "関数作成",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはTypeScriptを出力することができます。",
              userContent:
                "入力値を受け取り、説明なしで簡潔にコードだけ返します。",
            }),
          colorScheme: "purple",
        },
        {
          label: "HTML/CSS作成",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはHTML/CSSを出力することができます。",
              userContent:
                "入力値を受け取り、説明なしで簡潔にコードだけ返します。",
            }),
          colorScheme: "purple",
        },
        {
          label: "リファクタリング",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはTypeScriptを出力することができます。",
              userContent:
                "入力値を受け取り、リファクタリングして説明なしで簡潔にコードだけ返します。",
            }),

          colorScheme: "purple",
        },
        {
          label: "コードレビュー",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはTypeScriptを出力することができます。",
              userContent:
                "入力値を受け取り、コードレビューを簡潔に返答します。",
            }),

          colorScheme: "purple",
        },
        {
          label: "コードを出力",
          onClick: () =>
            onSubmit({
              systemContent:
                "あなたはTypeScriptを出力することができます。",
              userContent:
                "入力値を受け取り、説明なしで簡潔にコードだけ返します。",
            }),

          colorScheme: "purple",
        },
      ],
    },
    {
      label: "命名関連",
      buttons: [
        {
          label: "ブランチ名",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはGitHubのブランチ名を出力することができます。",
              userContent: "入力値を受け取り、ブランチ名を考えて一行で簡潔に出力します。",
            }),
          colorScheme: "orange",
        },
        {
          label: "コミットコメント",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはGitHubのブランチ名を出力することができます。",
              userContent: "入力値を受け取り、コミットコメントを考えて一行で簡潔に出力します。",
            }),

          colorScheme: "orange",
        },
        {
          label: "関数名",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはTypeScriptのプログラマーです。",
              userContent: "入力値を受け取り、関数名を1つ考えて一行で簡潔に出力します。",
            }),
          colorScheme: "orange",
        },
        {
          label: "変数名",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはTypeScript/Reactのプログラマーです。",
              userContent: "入力値を受け取り、変数名を1つ考えて一行で簡潔に出力します。",
            }),
          colorScheme: "orange",
        },
        {
          label: "ファイル名",
          onClick: () =>
            onSubmit({
              systemContent: "あなたはTypeScript/Reactのプログラマーです。",
              userContent: "入力値を受け取り、ファイル名を1つ考えて一行で簡潔に出力します。",
            }),
          colorScheme: "orange",
        },
      ],
    },
    {
      label: "翻訳関連",
      buttons: [
        {
          label: "単語（英語→日本語）",
          onClick: () =>
            onSubmit({
              systemContent: "あなたは辞書です。",
              userContent: "入力値を受け取り、英語から日本語の単語ごとの翻訳を返します。",
            }),

          colorScheme: "green",
        },
        {
          label: "文書（英語→日本語）",
          onClick: () =>
            onSubmit({
              systemContent: "あなたは辞書です。",
              userContent: "入力値を受け取り、英語から日本語の文章の翻訳を返します。",
            }),

          colorScheme: "green",
        },
        {
          label: "単語（日本語→英語）",
          onClick: () =>
            onSubmit({
              systemContent: "あなたは辞書です。",
              userContent: "入力値を受け取り、日本語から英語の単語を返します。",
            }),

          colorScheme: "green",
        },
        {
          label: "文書（日本語→英語）",
          onClick: () =>
            onSubmit({
              systemContent: "あなたは辞書です。",
              userContent: "入力値を受け取り、日本語から英語の文章を返します。",
            }),

          colorScheme: "green",
        },
      ],
    },
  ];

  return {
    result,
    errors,
    isValid,
    register,
    onSubmit,
    handleOnClear,
    BUTTON_GROUPS,
    isLoading,
    AccordionIndex,
    handleAccordionIndex,
  };
};
