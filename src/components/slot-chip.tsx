import { Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

import { Pressable } from '@/components/pressable';
import { useT } from '@/i18n/use-t';
import { timing } from '@/lib/motion';
import { cn } from '@/lib/cn';

interface SlotChipProps {
  time: string;
  left: number;
  selected: boolean;
  onPress: () => void;
}

export function SlotChip({ time, left, selected, onPress }: SlotChipProps) {
  const { t } = useT();
  const scale = useSharedValue(1);
  useEffect(() => {
    if (!selected) return;
    scale.set(0.9);
    scale.set(withTiming(1, timing.enter));
  }, [selected, scale]);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.get() }] }));

  const full = left === 0;
  const stateText = full ? t('menu.full') : t('menu.left', { n: left });
  const stateColor = full ? 'text-danger' : left === 1 ? 'text-warning-foreground' : 'text-success';
  return (
    <Animated.View style={style}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${time}, ${stateText}`}
        accessibilityState={{ selected }}
        className={cn(
          'min-h-14 min-w-20 items-center justify-center gap-1 rounded-full border px-4 py-2',
          selected ? 'border-accent bg-accent' : 'border-border bg-background',
        )}
      >
        <Text className={cn('text-body font-bold', selected ? 'text-accent-foreground' : 'text-foreground', full ? 'line-through' : '')}>{time}</Text>
        <Text
          className={cn(
            'text-caption font-semibold',
            selected ? 'text-accent-foreground' : stateColor,
            full ? 'line-through' : '',
            left === 1 && !selected ? 'rounded-full bg-warning px-2' : '',
          )}
        >
          {stateText}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
