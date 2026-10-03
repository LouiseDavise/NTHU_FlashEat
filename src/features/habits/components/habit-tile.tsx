import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from 'heroui-native';
import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Presets } from 'react-native-pulsar';

import { Pressable } from '@/components/pressable';
import { Card } from '@/components/card';
import { timing } from '@/lib/motion';
import type { Habit } from '../types/habit';
import { currentStreak } from '../utils/dates';

interface HabitTileProps {
  habit: Habit;
  firedToday: boolean;
  onToggle: () => void;
  onRemove: () => void;
}

export function HabitTile({ habit, firedToday, onToggle, onRemove }: HabitTileProps) {
  const accent = useThemeColor('accent');
  const accentFg = useThemeColor('accent-foreground');
  const muted = useThemeColor('muted');
  const fill = useSharedValue(firedToday ? 1 : 0);
  const glow = useSharedValue(1);
  const first = useRef(true);
  const streak = currentStreak(habit.done);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    fill.set(withTiming(firedToday ? 1 : 0, timing.enter));
    if (!firedToday) return;
    glow.set(0);
    glow.set(withTiming(1, timing.draw));
  }, [firedToday, fill, glow]);

  const fillStyle = useAnimatedStyle(() => ({
    opacity: fill.get(),
    transform: [{ scale: 0.4 + fill.get() * 0.6 }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: (1 - glow.get()) * 0.55,
    transform: [{ scale: 1 + glow.get() * 0.9 }],
  }));

  const fire = () => {
    if (firedToday) Presets.System.selection();
    else Presets.System.notificationSuccess();
    onToggle();
  };

  return (
    <Pressable
      onPress={fire}
      onLongPress={onRemove}>
      <Card>
      <View className="flex-row items-center gap-4">
      <View className="size-14 items-center justify-center">
        <Animated.View pointerEvents="none" className="absolute size-14 rounded-full bg-accent" style={glowStyle} />
        <View className="absolute size-14 rounded-full border-2 border-border" />
        <Animated.View className="absolute size-14 rounded-full bg-accent" style={fillStyle} />
        <Ionicons name={habit.icon} size={24} color={firedToday ? accentFg : muted} />
      </View>
      <View className="flex-1 gap-1">
        <Text className="text-lg font-semibold text-foreground" numberOfLines={2}>
          {habit.name}
        </Text>
        <Text className="text-sm text-muted">{firedToday ? 'Fired today' : 'Cold — tap to fire'}</Text>
      </View>
      <View className="items-center">
        <View className="flex-row items-center gap-1">
          <Ionicons name="flame" size={16} color={streak > 0 ? accent : muted} />
          <Text className="text-2xl font-bold text-foreground" style={{ fontVariant: ['tabular-nums'] }}>
            {streak}
          </Text>
        </View>
        <Text className="text-xs text-muted">{streak === 1 ? 'day' : 'days'}</Text>
      </View>
      </View>
      </Card>
    </Pressable>
  );
}
