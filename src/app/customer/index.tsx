import { Redirect, useRouter, type Href } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { ActiveOrderCard } from '@/components/active-order-card';
import { AppHeader } from '@/components/app-header';
import { CafeteriaCard } from '@/components/cafeteria-card';
import { OrderAgainCard } from '@/components/order-again-card';
import { StatusChip } from '@/components/status-chip';
import { CAFETERIAS } from '@/features/flasheat/data/seed';
import { useCartStore } from '@/features/flasheat/store/cart-store';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import { useT } from '@/i18n/use-t';

export default function CustomerHomeScreen() {
  const { t } = useT();
  const router = useRouter();
  const customer = useFlashEatStore((s) => s.session.customer);
  const orders = useFlashEatStore((s) => s.orders);
  const startStall = useCartStore((s) => s.startStall);

  if (!customer) return <Redirect href={'/' as Href} />;

  const mine = orders.filter((o) => o.customerName === customer.name).sort((a, b) => b.createdAt - a.createdAt);
  const active = mine.find((o) => o.status !== 'PickedUp');
  const last = mine[0];

  const reorder = () => {
    if (!last) return;
    startStall(last.stallId, last.items);
    router.push(`/customer/stall/${last.stallId}` as Href);
  };

  return (
    <View className="flex-1 bg-background">
      <AppHeader />
      <ScrollView className="flex-1" contentContainerClassName="px-4 pt-6 pb-safe-offset-4 gap-6">
        {active ? <ActiveOrderCard order={active} onOpen={() => router.push(`/customer/order/${active.id}` as Href)} /> : null}
        <View className="gap-3">
          <Text accessibilityRole="header" className="text-title font-bold text-foreground">{t('home.title')}</Text>
          <View className="flex-row items-center gap-2">
            <StatusChip label={t('home.calm')} tone="green" />
            <StatusChip label={t('home.busy')} tone="amber" />
            <StatusChip label={t('home.packed')} tone="red" />
          </View>
        </View>
        {CAFETERIAS.map((c) => (
          <CafeteriaCard key={c.id} cafeteria={c} onOpen={() => router.push(`/customer/cafeteria/${c.id}` as Href)} />
        ))}
        {last ? <OrderAgainCard order={last} onReorder={reorder} /> : null}
      </ScrollView>
    </View>
  );
}
