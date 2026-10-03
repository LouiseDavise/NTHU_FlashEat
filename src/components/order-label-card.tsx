import { Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { StatusChip } from '@/components/status-chip';
import { MENU_ITEMS } from '@/features/flasheat/data/seed';
import type { Order } from '@/features/flasheat/types/flasheat';
import { CUSTOMER_BADGE_KEY } from '@/features/flasheat/utils/status';
import { useNames, useT } from '@/i18n/use-t';
import { Fonts } from '@/constants/theme';

interface OrderLabelCardProps {
  order: Order;
  onAdvance: () => void;
}

export function OrderLabelCard({ order, onAdvance }: OrderLabelCardProps) {
  const { t } = useT();
  const nameOf = useNames();
  const ready = order.status === 'Ready';
  return (
    <View className="gap-3 rounded-xl border border-t-2 border-border border-t-foreground bg-background p-4" style={{ borderTopStyle: 'dashed' } as object}>
      <View className="flex-row items-center justify-between gap-3">
        <Text style={{ fontFamily: Fonts?.mono }} className="text-section font-bold text-foreground">{order.id}</Text>
        <StatusChip label={order.slotTime} tone="lilac" />
      </View>
      <View className="flex-row items-center gap-2">
        <StatusChip label={t(CUSTOMER_BADGE_KEY[order.customerType])} tone="purple" />
        <Text className="flex-1 text-body text-foreground">{order.customerName}</Text>
      </View>
      <View className="gap-1">
        {order.items.map((l) => {
          const item = MENU_ITEMS.find((m) => m.id === l.menuItemId);
          return (
            <Text key={l.menuItemId} className="text-emph text-foreground">
              <Text className="font-bold">{l.qty}×</Text> {item ? nameOf(item).primary : ''}
            </Text>
          );
        })}
      </View>
      {order.note ? (
        <View className="rounded-lg bg-warning px-3 py-2">
          <Text className="text-body font-semibold text-warning-foreground">{t('tenant.note')}: {order.note}</Text>
        </View>
      ) : null}
      {ready && order.shelfSpot ? (
        <View className="items-center rounded-xl bg-lilac py-3">
          <Text className="text-caption text-muted">{t('tenant.shelf')}</Text>
          <Text style={{ fontFamily: Fonts?.mono }} className="text-code font-bold text-accent">{order.shelfSpot}</Text>
        </View>
      ) : null}
      {ready ? null : (
        <ActionButton label={order.status === 'Confirmed' ? t('tenant.startPreparing') : t('tenant.readyOnShelf')} onPress={onAdvance} />
      )}
    </View>
  );
}
