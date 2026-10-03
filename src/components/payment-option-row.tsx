import { Text, View } from 'react-native';

import { Pressable } from '@/components/pressable';
import { cn } from '@/lib/cn';

interface PaymentOptionRowProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function PaymentOptionRow({ label, selected, onSelect }: PaymentOptionRowProps) {
  return (
    <Pressable
      onPress={onSelect}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      className="min-h-12 flex-row items-center gap-3 py-2"
    >
      <View className={cn('size-6 items-center justify-center rounded-full border-2', selected ? 'border-accent' : 'border-border')}>
        {selected ? <View className="size-3 rounded-full bg-accent" /> : null}
      </View>
      <Text className={cn('flex-1 text-body text-foreground', selected ? 'font-semibold' : '')}>{label}</Text>
    </Pressable>
  );
}
