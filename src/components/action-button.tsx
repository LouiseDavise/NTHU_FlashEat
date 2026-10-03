import { ActivityIndicator, Text } from 'react-native';

import { Pressable } from '@/components/pressable';
import { cn } from '@/lib/cn';

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const surface = {
  primary: 'bg-accent',
  secondary: 'bg-background border border-accent',
  danger: 'bg-danger',
} as const;

const labelColor = {
  primary: 'text-accent-foreground',
  secondary: 'text-accent',
  danger: 'text-danger-foreground',
} as const;

export function ActionButton({ label, onPress, variant = 'primary', disabled, loading, className }: ActionButtonProps) {
  const inactive = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      isDisabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      className={cn('min-h-12 flex-row items-center justify-center gap-2 rounded-xl px-4', surface[variant], inactive ? 'opacity-40' : '', className)}
    >
      {loading ? <ActivityIndicator color="white" /> : null}
      <Text className={cn('text-emph font-semibold', labelColor[variant])}>{label}</Text>
    </Pressable>
  );
}
