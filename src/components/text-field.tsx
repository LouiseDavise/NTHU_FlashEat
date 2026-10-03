import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { useThemeColor } from 'heroui-native';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string | null;
}

export function TextField({ label, error, ...rest }: TextFieldProps) {
  const muted = useThemeColor('muted');
  return (
    <View className="gap-1">
      <Text className="text-caption font-semibold text-muted">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={muted}
        className="h-12 rounded-xl border border-border bg-background px-3 text-body leading-none text-foreground"
        {...rest}
      />
      {error ? <Text className="text-caption text-danger">{error}</Text> : null}
    </View>
  );
}
