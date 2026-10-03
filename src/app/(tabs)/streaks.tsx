import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from 'heroui-native';
import { ScrollView, Text, View } from 'react-native';

import { Card } from '@/components/card';
import { useHabitStore } from '@/features/habits/store/habit-store';
import { bestStreak, currentStreak, dateKey, daysAgo } from '@/features/habits/utils/dates';

const DAYS = Array.from({ length: 14 }, (_, i) => 13 - i);

export default function StreaksScreen() {
  const habits = useHabitStore((s) => s.habits);
  const accent = useThemeColor('accent');
  const total = habits.reduce((n, h) => n + h.done.length, 0);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-6"
      showsVerticalScrollIndicator={false}>
      <View className="gap-1">
        <Text className="text-3xl font-bold text-foreground" numberOfLines={1}>
          Streaks
        </Text>
        <Text className="text-base text-muted">{total} firings so far</Text>
      </View>
      {habits.map((h) => {
        const set = new Set(h.done);
        return (
          <Card key={h.id}>
            <View className="flex-row items-center justify-between gap-3">
              <Text className="flex-1 text-lg font-semibold text-foreground" numberOfLines={1}>
                {h.name}
              </Text>
              <View className="flex-row items-center gap-1">
                <Ionicons name="flame" size={18} color={accent} />
                <Text className="text-2xl font-bold text-foreground">{currentStreak(h.done)}</Text>
              </View>
            </View>
            <View className="flex-row gap-1">
              {DAYS.map((n) => (
                <View
                  key={n}
                  className={set.has(dateKey(daysAgo(n))) ? 'h-8 flex-1 rounded-md bg-accent' : 'h-8 flex-1 rounded-md bg-border'}
                />
              ))}
            </View>
            <Text className="text-sm text-muted">Best run: {bestStreak(h.done)} {bestStreak(h.done) === 1 ? 'day' : 'days'} · last 14 days</Text>
          </Card>
        );
      })}
    </ScrollView>
  );
}
