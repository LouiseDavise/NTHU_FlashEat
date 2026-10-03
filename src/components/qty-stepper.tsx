import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import { useT } from '@/i18n/use-t';
import { cn } from '@/lib/cn';

interface QtyStepperProps {
  name: string;
  qty: number;
  onChange: (qty: number) => void;
}

export function QtyStepper({ name, qty, onChange }: QtyStepperProps) {
  const { t } = useT();
  return (
    <View className="flex-row items-center">
      <Pressable
        onPress={() => onChange(qty - 1)}
        isDisabled={qty === 0}
        accessibilityRole="button"
        accessibilityLabel={t('menu.remove', { name })}
        className={cn('size-11 items-center justify-center rounded-full border border-accent', qty === 0 ? 'opacity-30' : '')}
      >
        <Icon name="remove" size={20} tone="accent" />
      </Pressable>
      <Text accessibilityLabel={t('menu.quantity', { name, n: qty })} className="w-9 text-center text-emph font-semibold text-foreground">
        {qty}
      </Text>
      <Pressable
        onPress={() => onChange(qty + 1)}
        isDisabled={qty >= 10}
        accessibilityRole="button"
        accessibilityLabel={t('menu.add', { name })}
        className={cn('size-11 items-center justify-center rounded-full bg-accent', qty >= 10 ? 'opacity-30' : '')}
      >
        <Icon name="add" size={20} tone="white" />
      </Pressable>
    </View>
  );
}
