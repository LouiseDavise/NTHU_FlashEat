import { useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { AppHeader } from '@/components/app-header';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { OrderTracker } from '@/components/order-tracker';
import { QrCode } from '@/components/qr-code';
import { CAFETERIAS, MENU_ITEMS, STALLS } from '@/features/flasheat/data/seed';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import { Fonts } from '@/constants/theme';
import { useNames, useT } from '@/i18n/use-t';

export default function OrderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useT();
  const nameOf = useNames();
  const router = useRouter();
  const order = useFlashEatStore((s) => s.orders.find((o) => o.id === id));
  const stall = STALLS.find((s) => s.id === order?.stallId);
  const caf = CAFETERIAS.find((c) => c.id === stall?.cafeteriaId);

  if (!order || !stall) {
    return (
      <View className="flex-1 bg-background">
        <AppHeader showBack onBack={() => router.replace('/customer' as Href)} />
        <EmptyState icon="receipt-outline" title={t('order.notFound')} hint="" actionLabel={t('order.home')} onAction={() => router.replace('/customer' as Href)} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <AppHeader showBack onBack={() => router.replace('/customer' as Href)} />
      <ScrollView className="flex-1" contentContainerClassName="px-4 pt-6 pb-safe-offset-4 gap-6">
        <Text accessibilityRole="header" className="text-title font-bold text-foreground">{t('order.title')}</Text>
        <Card>
          <View className="items-center gap-3">
            <QrCode value={`${order.id}:${order.pickupCode}`} size={180} />
            <Text className="text-caption font-semibold text-muted">{t('order.pickupCode')}</Text>
            <Text
              accessibilityLabel={`${t('order.pickupCode')} ${order.pickupCode.split('').join(' ')}`}
              style={{ fontFamily: Fonts?.mono, letterSpacing: 8 }}
              className="text-code font-bold text-accent"
            >
              {order.pickupCode}
            </Text>
            <Text className="text-center text-body text-muted">{t('order.instruction')}</Text>
          </View>
        </Card>
        <Card>
          <OrderTracker status={order.status} />
          {order.shelfSpot ? (
            <Text className="text-emph font-bold text-success">{t('order.shelfSpot', { spot: order.shelfSpot })}</Text>
          ) : null}
        </Card>
        <Card>
          <Row label={t('order.id')} value={order.id} />
          <Row label={t('order.stall')} value={nameOf(stall).primary} />
          <Row label={t('order.cafeteria')} value={caf ? nameOf(caf).primary : ''} />
          <Row label={t('order.pickupSlot')} value={order.slotTime} />
          {order.items.map((l) => {
            const item = MENU_ITEMS.find((m) => m.id === l.menuItemId);
            return <Row key={l.menuItemId} label={`${l.qty} ×`} value={item ? nameOf(item).primary : l.menuItemId} />;
          })}
          {order.note ? <Row label={t('order.note')} value={order.note} /> : null}
          <Row label={t('checkout.total')} value={`NT$${order.total}`} />
        </Card>
        <ActionButton label={t('order.home')} variant="secondary" onPress={() => router.replace('/customer' as Href)} />
      </ScrollView>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between gap-4">
      <Text className="text-body text-muted">{label}</Text>
      <Text className="flex-1 text-right text-body text-foreground">{value}</Text>
    </View>
  );
}
