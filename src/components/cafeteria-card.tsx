import { Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { HeatBar } from '@/components/heat-bar';
import { Pressable } from '@/components/pressable';
import { StatusChip, type ChipTone } from '@/components/status-chip';
import type { Cafeteria } from '@/features/flasheat/types/flasheat';
import { useNames, useT } from '@/i18n/use-t';

interface CafeteriaCardProps {
  cafeteria: Cafeteria;
  onOpen: () => void;
}

const crowdTone: Record<Cafeteria['crowdLevel'], ChipTone> = { calm: 'green', busy: 'amber', packed: 'red' };

export function CafeteriaCard({ cafeteria, onOpen }: CafeteriaCardProps) {
  const { t } = useT();
  const names = useNames()(cafeteria);
  return (
    <Pressable
      onPress={onOpen}
      accessibilityRole="button"
      accessibilityLabel={`${names.primary} ${names.secondary}`}
      className="gap-4 rounded-2xl border border-border bg-background p-4"
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-section font-bold text-foreground">{names.primary}</Text>
          <Text className="text-body text-muted">{names.secondary}</Text>
        </View>
        <StatusChip label={t(`home.${cafeteria.crowdLevel}`)} tone={crowdTone[cafeteria.crowdLevel]} />
      </View>
      <HeatBar heat={cafeteria.heat} />
      <Text className="text-body text-foreground">{t('home.lineWait', { n: cafeteria.lineWaitMin })}</Text>
      <ActionButton label={t('home.orderAhead')} onPress={onOpen} />
    </Pressable>
  );
}
