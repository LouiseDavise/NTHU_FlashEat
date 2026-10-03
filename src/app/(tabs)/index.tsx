import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useThemeColor } from 'heroui-native';
import { useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Presets } from 'react-native-pulsar';

import { Pressable } from '@/components/pressable';
import { HabitTile } from '@/features/habits/components/habit-tile';
import { useHabitStore } from '@/features/habits/store/habit-store';
import { dateKey } from '@/features/habits/utils/dates';
import { confirmDelete } from '@/lib/confirm';
import { fadeIn, fadeOut, reflow } from '@/lib/motion';

export default function TodayScreen() {
  const router = useRouter();
  const accent = useThemeColor('accent');
  const habits = useHabitStore((s) => s.habits);
  const toggle = useHabitStore((s) => s.toggle);
  const remove = useHabitStore((s) => s.remove);
  const today = dateKey(new Date());
  const firedCount = habits.filter((h) => h.done.includes(today)).length;
  const full = habits.length > 0 && firedCount === habits.length;
  const wasFull = useRef(full);

  useEffect(() => {
    if (full && !wasFull.current) Presets.System.notificationSuccess();
    wasFull.current = full;
  }, [full]);

  const dateLabel = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="px-5 pt-safe-offset-2 pb-safe-offset-22 gap-6"
      showsVerticalScrollIndicator={false}>
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1 gap-1">
          <Text className="text-3xl font-bold text-foreground" numberOfLines={1}>
            Today
          </Text>
          <Text className="text-base text-muted">{dateLabel}</Text>
        </View>
        <Pressable
          accessibilityLabel="Add habit"
          onPress={() => router.push('/new' as never)}
          className="size-11 items-center justify-center rounded-full bg-accent">
          <Ionicons name="add" size={26} color="white" />
        </Pressable>
      </View>

      {habits.length === 0 ? (
        <View className="items-center gap-3 py-16">
          <Ionicons name="flame-outline" size={40} color={accent} />
          <Text className="text-lg font-semibold text-foreground">The kiln is empty</Text>
          <Text className="text-center text-base text-muted">Add a habit to start your first streak.</Text>
        </View>
      ) : (
        <View className="gap-1">
          <Text className="text-xl font-semibold text-foreground">
            {full ? 'Kiln is full' : `${firedCount} of ${habits.length} fired`}
          </Text>
          <Text className="text-base text-muted">
            {full ? 'Everything is lit. See you tomorrow.' : 'Tap a habit when you have done it.'}
          </Text>
        </View>
      )}

      <View className="gap-3">
        {habits.map((h) => (
          <Animated.View key={h.id} entering={fadeIn} exiting={fadeOut} layout={reflow}>
            <HabitTile
              habit={h}
              firedToday={h.done.includes(today)}
              onToggle={() => toggle(h.id)}
              onRemove={() =>
                confirmDelete({
                  title: `Remove “${h.name}”?`,
                  message: 'Its streak history goes too.',
                  confirmLabel: 'Remove',
                  onConfirm: () => remove(h.id),
                })
              }
            />
          </Animated.View>
        ))}
      </View>
      {habits.length > 0 ? <Text className="text-center text-sm text-muted">Press and hold a habit to remove it.</Text> : null}
    </ScrollView>
  );
}
