import { Redirect, useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { AppHeader } from '@/components/app-header';
import { EmptyState } from '@/components/empty-state';
import { OrderLabelCard } from '@/components/order-label-card';
import { Segmented } from '@/components/segmented';
import { TodaySummary } from '@/components/today-summary';
import { STALLS } from '@/features/flasheat/data/seed';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import type { OrderStatus } from '@/features/flasheat/types/flasheat';
import { useNames, useT } from '@/i18n/use-t';

type Tab = 'new' | 'preparing' | 'ready';
const TAB_STATUS: Record<Tab, OrderStatus> = { new: 'Confirmed', preparing: 'Preparing', ready: 'Ready' };

export default function TenantQueueScreen() {
  const { t } = useT();
  const nameOf = useNames();
  const router = useRouter();
  const stallId = useFlashEatStore((s) => s.session.tenantStallId);
  const orders = useFlashEatStore((s) => s.orders);
  const advanceOrder = useFlashEatStore((s) => s.advanceOrder);
  const [tab, setTab] = useState<Tab>('new');

  const stall = STALLS.find((s) => s.id === stallId);
  if (!stall) return <Redirect href={'/' as Href} />;

  const mine = orders.filter((o) => o.stallId === stall.id);
  const count = (tb: Tab) => mine.filter((o) => o.status === TAB_STATUS[tb]).length;
  const list = mine.filter((o) => o.status === TAB_STATUS[tab]).sort((a, b) => a.slotTime.localeCompare(b.slotTime) || a.createdAt - b.createdAt);
  const revenue = mine.reduce((sum, o) => sum + o.total, 0);

  return (
    <View className="flex-1 bg-background">
      <AppHeader />
      <ScrollView className="flex-1" contentContainerClassName="px-4 pt-6 pb-6 gap-4">
        <Text accessibilityRole="header" className="text-title font-bold text-foreground">{nameOf(stall).primary}</Text>
        <TodaySummary orders={mine.length} revenue={revenue} />
        <Segmented
          values={['new', 'preparing', 'ready'] as const}
          labels={[`${t('tenant.new')} ${count('new')}`, `${t('tenant.preparing')} ${count('preparing')}`, `${t('tenant.ready')} ${count('ready')}`]}
          value={tab}
          onChange={setTab}
        />
        {list.length === 0 ? (
          <EmptyState
            icon="file-tray-outline"
            title={t(tab === 'new' ? 'tenant.emptyNew' : tab === 'preparing' ? 'tenant.emptyPreparing' : 'tenant.emptyReady')}
            hint={t(tab === 'new' ? 'tenant.emptyNewHint' : tab === 'preparing' ? 'tenant.emptyPreparingHint' : 'tenant.emptyReadyHint')}
          />
        ) : (
          list.map((o) => <OrderLabelCard key={o.id} order={o} onAdvance={() => advanceOrder(o.id)} />)
        )}
      </ScrollView>
      <View className="border-t border-border bg-background px-4 pb-safe-offset-2 pt-3">
        <ActionButton label={t('tenant.pickupCheck')} onPress={() => router.push('/tenant/pickup' as Href)} />
      </View>
    </View>
  );
}
