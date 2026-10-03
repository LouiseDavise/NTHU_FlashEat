import { Text, View } from 'react-native';

import { cn } from '@/lib/cn';

export type ChipTone = 'green' | 'amber' | 'red' | 'purple' | 'lilac' | 'grey';

interface StatusChipProps {
  label: string;
  tone: ChipTone;
  strike?: boolean;
}

const toneSurface: Record<ChipTone, string> = {
  green: 'bg-success',
  amber: 'bg-warning',
  red: 'bg-danger',
  purple: 'bg-accent',
  lilac: 'bg-lilac',
  grey: 'bg-default',
};

const toneText: Record<ChipTone, string> = {
  green: 'text-success-foreground',
  amber: 'text-warning-foreground',
  red: 'text-danger-foreground',
  purple: 'text-accent-foreground',
  lilac: 'text-accent',
  grey: 'text-muted',
};

export function StatusChip({ label, tone, strike }: StatusChipProps) {
  return (
    <View className={cn('self-start rounded-full px-3 py-1', toneSurface[tone])}>
      <Text className={cn('text-caption font-semibold', toneText[tone], strike ? 'line-through' : '')}>{label}</Text>
    </View>
  );
}
