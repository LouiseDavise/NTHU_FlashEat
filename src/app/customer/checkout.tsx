import { useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { AppHeader } from '@/components/app-header';
import { Card } from '@/components/card';
import { EmptyState } from '@/components/empty-state';
import { PaymentOptionRow } from '@/components/payment-option-row';
import { TextField } from '@/components/text-field';
import { MENU_ITEMS, PAYMENT_METHODS, STALLS, type PaymentMethod } from '@/features/flasheat/data/seed';
import { useCartStore } from '@/features/flasheat/store/cart-store';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import { cartLines, linesTotal } from '@/features/flasheat/utils/format';
import { useNames, useT } from '@/i18n/use-t';

type Phase = 'idle' | 'processing' | 'success';

export default function CheckoutScreen() {
  const { t } = useT();
  const nameOf = useNames();
  const router = useRouter();
  const cart = useCartStore();
  const placeOrder = useFlashEatStore((s) => s.placeOrder);
  const [method, setMethod] = useState<PaymentMethod>('linePay');
  const [phase, setPhase] = useState<Phase>('idle');

  const stall = STALLS.find((s) => s.id === cart.stallId);
  const lines = cartLines(cart.qty);
  const total = linesTotal(lines);

  if (phase === 'idle' && (!stall || lines.length === 0 || !cart.slotTime)) {
    return (
      <View className="flex-1 bg-background">
        <AppHeader showBack />
        <EmptyState
          icon="cart-outline"
          title={t('checkout.empty')}
          hint={t('checkout.emptyHint')}
          actionLabel={t('checkout.backToStalls')}
          onAction={() => router.replace('/customer' as Href)}
        />
      </View>
    );
  }

  const pay = () => {
    if (phase !== 'idle' || !stall || !cart.slotTime) return;
    const slotTime = cart.slotTime;
    const note = cart.note;
    setPhase('processing');
    setTimeout(() => {
      setPhase('success');
      setTimeout(() => {
        const order = placeOrder({ stallId: stall.id, items: lines, total, slotTime, note });
        cart.clear();
        router.replace(`/customer/order/${order.id}` as Href);
      }, 700);
    }, 1500);
  };

  const label =
    phase === 'processing' ? t('checkout.processing') : phase === 'success' ? t('checkout.success') : t('checkout.pay', { total });

  return (
    <View className="flex-1 bg-background">
      <AppHeader showBack />
      <ScrollView className="flex-1" contentContainerClassName="px-4 pt-6 pb-6 gap-6" keyboardShouldPersistTaps="handled">
        <Text accessibilityRole="header" className="text-title font-bold text-foreground">{t('checkout.title')}</Text>
        <Card>
          <Text className="text-emph font-semibold text-foreground">{stall ? nameOf(stall).primary : ''}</Text>
          {lines.map((l) => {
            const item = MENU_ITEMS.find((m) => m.id === l.menuItemId);
            return (
              <View key={l.menuItemId} className="flex-row justify-between gap-3">
                <Text className="flex-1 text-body text-foreground">{l.qty} × {item ? nameOf(item).primary : l.menuItemId}</Text>
                <Text className="text-body text-foreground">NT${l.qty * (item?.price ?? 0)}</Text>
              </View>
            );
          })}
          <View className="flex-row justify-between">
            <Text className="text-body text-muted">{t('checkout.pickup')}</Text>
            <Text className="text-body font-semibold text-foreground">{cart.slotTime}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-emph font-bold text-foreground">{t('checkout.total')}</Text>
            <Text className="text-emph font-bold text-foreground">NT${total}</Text>
          </View>
        </Card>
        <TextField
          label={t('checkout.noteLabel')}
          placeholder={t('checkout.notePlaceholder')}
          value={cart.note}
          onChangeText={cart.setNote}
          editable={phase === 'idle'}
        />
        <View className="gap-3">
          <Text className="text-section font-bold text-foreground">{t('checkout.payment')}</Text>
          {PAYMENT_METHODS.map((m) => (
            <PaymentOptionRow key={m} label={t(`checkout.${m}`)} selected={method === m} onSelect={() => phase === 'idle' && setMethod(m)} />
          ))}
          <Text className="text-caption text-muted">{t('checkout.demoNote')}</Text>
        </View>
      </ScrollView>
      <View className="border-t border-border bg-background px-4 pb-safe-offset-2 pt-3">
        <ActionButton label={label} onPress={pay} loading={phase === 'processing'} disabled={phase !== 'idle'} />
      </View>
    </View>
  );
}
