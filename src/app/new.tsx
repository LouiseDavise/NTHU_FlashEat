import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, useThemeColor } from 'heroui-native';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Card } from '@/components/card';
import { Pressable } from '@/components/pressable';
import { pressHaptic } from '@/components/pressable';
import { useHabitStore } from '@/features/habits/store/habit-store';
import type { HabitIcon } from '@/features/habits/types/habit';

const ICONS: HabitIcon[] = ['brush', 'body', 'book', 'water', 'leaf', 'moon', 'barbell', 'musical-notes'];

export default function NewHabitScreen() {
  const router = useRouter();
  const add = useHabitStore((s) => s.add);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<HabitIcon>('brush');
  const muted = useThemeColor('muted');
  const accentFg = useThemeColor('accent-foreground');
  const ready = name.trim().length > 0;

  const save = () => {
    pressHaptic();
    add(name.trim(), icon);
    router.back();
  };

  return (
    <KeyboardAwareScrollView className="flex-1 bg-background" contentContainerClassName="px-5 pt-6 pb-safe-offset-4 gap-6">
      <Text className="text-2xl font-bold text-foreground">New habit</Text>
      <Card>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="What will you do every day?"
        placeholderTextColor={muted}
        autoFocus
        returnKeyType="done"
        onSubmitEditing={ready ? save : undefined}
        className="text-lg leading-none text-foreground"
      />
      </Card>
      <View className="flex-row flex-wrap gap-3">
        {ICONS.map((i) => (
          <Pressable
            key={i}
            accessibilityLabel={i}
            onPress={() => setIcon(i)}
            className={icon === i ? 'size-14 items-center justify-center rounded-full bg-accent' : 'size-14 items-center justify-center rounded-full bg-surface'}>
            <Ionicons name={i} size={24} color={icon === i ? accentFg : muted} />
          </Pressable>
        ))}
      </View>
      <Button onPress={save} isDisabled={!ready} size="lg">
        <Button.Label>Add habit</Button.Label>
      </Button>
    </KeyboardAwareScrollView>
  );
}
