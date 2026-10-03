import { Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { StatusChip } from '@/components/status-chip';
import { STALLS } from '@/features/flasheat/data/seed';
import type { Order } from '@/features/flasheat/types/flasheat';
import { STATUS_KEY } from '@/features/flasheat/utils/status';
import { useNames, useT } from '@/i18n/use-t';

interface ActiveOrderCardProps {
  order: Order;
  onOpen: () => void;
}

export function ActiveOrderCard({ order, onOpen }: ActiveOrderCardProps) {
  const { t } = useT();
  const nameOf = useNames();
  const stall = STALLS.find((s) => s.id === order.stallId);
  return (
    <View className="gap-3 rounded-2xl bg-accent p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-caption font-semibold text-lilac-text">{t('home.activeOrder')}</Text>
        <StatusChip label={t(STATUS_KEY[order.status])} tone={order.status === 'Ready' ? 'green' : 'lilac'} />
      </View>
      <View>
        <Text className="text-emph font-semibold text-accent-foreground">{stall ? nameOf(stall).primary : ''}</Text>
        <Text className="text-body text-lilac-text">
          {order.id} · {order.slotTime}
          {order.shelfSpot && order.status === 'Ready' ? ` · ${t('order.shelfSpot', { spot: order.shelfSpot })}` : ''}
        </Text>
      </View>
      <ActionButton label={t('home.viewPass')} onPress={onOpen} variant="secondary" />
    </View>
  );
}
