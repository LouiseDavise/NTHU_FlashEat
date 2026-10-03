import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import { useT } from '@/i18n/use-t';
import { cn } from '@/lib/cn';

interface PinPadProps {
  digits: string;
  onChange: (digits: string) => void;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

export function PinPad({ digits, onChange }: PinPadProps) {
  const { t } = useT();
  const add = (d: string) => {
    if (digits.length < 4) onChange(digits + d);
  };
  const keyClass = 'h-16 flex-1 items-center justify-center rounded-xl bg-lilac';
  return (
    <View className="gap-6">
      <View className="flex-row justify-center gap-3" accessibilityLabel={digits.split('').join(' ')}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            className={cn('size-16 items-center justify-center rounded-xl border-2', i === digits.length ? 'border-accent' : 'border-border')}
          >
            <Text className="text-section font-bold text-foreground">{digits[i] ?? ''}</Text>
          </View>
        ))}
      </View>
      <View className="gap-3">
        {[0, 1, 2].map((row) => (
          <View key={row} className="flex-row gap-3">
            {KEYS.slice(row * 3, row * 3 + 3).map((k) => (
              <Pressable key={k} onPress={() => add(k)} accessibilityRole="button" accessibilityLabel={k} className={keyClass}>
                <Text className="text-section font-bold text-foreground">{k}</Text>
              </Pressable>
            ))}
          </View>
        ))}
        <View className="flex-row gap-3">
          <View className="flex-1" />
          <Pressable onPress={() => add('0')} accessibilityRole="button" accessibilityLabel="0" className={keyClass}>
            <Text className="text-section font-bold text-foreground">0</Text>
          </Pressable>
          <Pressable
            onPress={() => onChange(digits.slice(0, -1))}
            accessibilityRole="button"
            accessibilityLabel={t('pickup.backspace')}
            className={keyClass}
          >
            <Icon name="backspace-outline" size={28} tone="accent" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
