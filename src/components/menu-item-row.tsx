import { Text, View } from 'react-native';

import { QtyStepper } from '@/components/qty-stepper';
import { StatusChip } from '@/components/status-chip';
import type { MenuItem } from '@/features/flasheat/types/flasheat';
import { useNames, useT } from '@/i18n/use-t';
import { cn } from '@/lib/cn';

interface MenuItemRowProps {
  item: MenuItem;
  qty: number;
  onChange: (qty: number) => void;
}

export function MenuItemRow({ item, qty, onChange }: MenuItemRowProps) {
  const { t } = useT();
  const names = useNames()(item);
  return (
    <View className={cn('flex-row items-center gap-3 py-3', item.soldOut ? 'opacity-50' : '')}>
      <View className="flex-1 gap-1">
        <Text className="text-emph font-semibold text-foreground">{names.primary}</Text>
        <Text className="text-caption text-muted">{names.secondary}</Text>
        <Text className="text-body font-semibold text-accent">NT${item.price}</Text>
      </View>
      {item.soldOut ? (
        <StatusChip label={t('menu.soldOut')} tone="grey" />
      ) : (
        <QtyStepper name={names.primary} qty={qty} onChange={onChange} />
      )}
    </View>
  );
}
