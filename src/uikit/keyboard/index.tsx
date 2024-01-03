import {FC, PropsWithChildren, memo} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native';

interface IKeyboardProps extends KeyboardAvoidingViewProps {}

const Keyboard: FC<PropsWithChildren<IKeyboardProps>> = props => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={24}
      {...props}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default memo(Keyboard);
