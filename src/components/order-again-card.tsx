import { Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { Card } from '@/components/card';
import { MENU_ITEMS, STALLS } from '@/features/flasheat/data/seed';
import type { Order } from '@/features/flasheat/types/flasheat';
import { useNames, useT } from '@/i18n/use-t';

interface OrderAgainCardProps {
  order: Order;
  onReorder: () => void;
}

export function OrderAgainCard({ order, onReorder }: OrderAgainCardProps) {
  const { t } = useT();
  const nameOf = useNames();
  const stall = STALLS.find((s) => s.id === order.stallId);
  const summary = order.items
    .map((l) => {
      const item = MENU_ITEMS.find((m) => m.id === l.menuItemId);
      return item ? `${nameOf(item).primary} ×${l.qty}` : '';
    })
    .join(', ');
  return (
    <Card>
      <View className="gap-1">
        <Text className="text-caption text-muted">{t('home.orderAgainFrom', { stall: stall ? nameOf(stall).primary : '' })}</Text>
        <Text className="text-body font-semibold text-foreground">{summary}</Text>
      </View>
      <ActionButton label={t('home.orderAgain')} onPress={onReorder} variant="secondary" />
    </Card>
  );
}
