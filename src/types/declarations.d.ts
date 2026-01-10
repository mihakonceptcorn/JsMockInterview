declare module 'react-native-code-highlighter' {
  import { ReactNode } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  interface CodeHighlighterProps {
    hljsStyle?: any;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    children: string | ReactNode;
    language?: string;
  }

  const CodeHighlighter: React.FC<CodeHighlighterProps>;
  export default CodeHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  export const atomOneDark: any;
  export const a11yDark: any;
}
