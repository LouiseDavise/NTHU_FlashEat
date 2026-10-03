import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import { StatusChip } from '@/components/status-chip';
import { MENU_ITEMS } from '@/features/flasheat/data/seed';
import type { Stall } from '@/features/flasheat/types/flasheat';
import { useNames, useT } from '@/i18n/use-t';

interface StallCardProps {
  stall: Stall;
  lineWait: number;
  allFull: boolean;
  onOpen: () => void;
}

export function StallCard({ stall, lineWait, allFull, onOpen }: StallCardProps) {
  const { t } = useT();
  const nameOf = useNames();
  const names = nameOf(stall);
  const highlights = MENU_ITEMS.filter((m) => m.stallId === stall.id && !m.soldOut).slice(0, 2);
  return (
    <Pressable
      onPress={onOpen}
      accessibilityRole="button"
      accessibilityLabel={`${names.primary} ${names.secondary}`}
      className="gap-3 rounded-2xl border border-border bg-background p-4"
    >
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-1">
          <Text className="text-section font-bold text-foreground">{names.primary}</Text>
          <Text className="text-body text-muted">{names.secondary}</Text>
        </View>
        <Icon name="arrow-forward" size={22} tone="accent" />
      </View>
      <View className="flex-row flex-wrap items-center gap-2">
        <StatusChip label={t('stalls.prep', { n: stall.prepTimeMin })} tone="lilac" />
        <StatusChip label={t('stalls.lineWait', { n: lineWait })} tone="grey" />
        {allFull ? <StatusChip label={t('stalls.allFull')} tone="red" /> : null}
      </View>
      <View className="gap-1">
        {highlights.map((m) => (
          <Text key={m.id} className="text-body text-foreground">
            {nameOf(m).primary} <Text className="text-muted">NT${m.price}</Text>
          </Text>
        ))}
      </View>
    </Pressable>
  );
}
