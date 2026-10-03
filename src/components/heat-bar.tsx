import { Text, View } from 'react-native';

import { useT } from '@/i18n/use-t';
import { cn } from '@/lib/cn';

interface HeatBarProps {
  heat: number[];
}

const heatClass = ['bg-heat-1', 'bg-heat-2', 'bg-heat-3', 'bg-heat-4'] as const;

export function HeatBar({ heat }: HeatBarProps) {
  const { t } = useT();
  return (
    <View className="gap-1" accessibilityLabel={`${t('home.timeRange')}, ${t('home.now')}`}>
      <View className="h-10 justify-end">
        <View className="h-7 flex-row gap-px overflow-hidden rounded-lg">
          {heat.map((h, i) => (
            <View key={i} className={cn('flex-1', heatClass[h] ?? 'bg-heat-1')} />
          ))}
        </View>
        <View className="absolute inset-y-0 left-1/4 items-center" pointerEvents="none">
          <View className="w-0.5 flex-1 bg-foreground" />
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-caption text-muted">11:00</Text>
        <Text className="text-caption font-semibold text-foreground">{t('home.now')}</Text>
        <Text className="text-caption text-muted">14:00</Text>
      </View>
    </View>
  );
}
