import { Redirect, useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { AppHeader } from '@/components/app-header';
import { Card } from '@/components/card';
import { CartBar } from '@/components/cart-bar';
import { MenuItemRow } from '@/components/menu-item-row';
import { SlotChip } from '@/components/slot-chip';
import { SlotFullSheet } from '@/components/slot-full-sheet';
import { StatusChip } from '@/components/status-chip';
import { MENU_ITEMS, SLOT_TIMES, STALLS } from '@/features/flasheat/data/seed';
import { useCartStore } from '@/features/flasheat/store/cart-store';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import { cartLines, linesCount, linesTotal } from '@/features/flasheat/utils/format';
import { allSlotsFull, nextAvailableSlot, slotsLeft } from '@/features/flasheat/utils/slots';
import { useNames, useT } from '@/i18n/use-t';

export default function StallMenuScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useT();
  const nameOf = useNames();
  const router = useRouter();
  const bookings = useFlashEatStore((s) => s.bookings);
  const cart = useCartStore();
  const [fullTime, setFullTime] = useState<string | null>(null);
  const stall = STALLS.find((s) => s.id === id);
  const stallKey = stall?.id;
  const startStall = cart.startStall;
  const cartStallId = cart.stallId;

  useEffect(() => {
    if (stallKey && cartStallId !== stallKey) startStall(stallKey);
  }, [stallKey, cartStallId, startStall]);

  if (!stall) return <Redirect href={'/customer' as Href} />;

  const names = nameOf(stall);
  const menu = MENU_ITEMS.filter((m) => m.stallId === stall.id);
  const lines = cartLines(cart.qty);
  const count = linesCount(lines);
  const total = linesTotal(lines);
  const everyFull = allSlotsFull(bookings, stall.id);

  const onSlot = (time: string) => {
    if (slotsLeft(bookings, stall.id, time) === 0) {
      setFullTime(time);
      return;
    }
    cart.setSlot(time);
  };

  return (
    <View className="flex-1 bg-background">
      <AppHeader showBack />
      <ScrollView className="flex-1" contentContainerClassName="px-4 pt-6 pb-6 gap-6">
        <View className="gap-2">
          <Text accessibilityRole="header" className="text-title font-bold text-foreground">{names.primary}</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-body text-muted">{names.secondary}</Text>
            <StatusChip label={t('stalls.prep', { n: stall.prepTimeMin })} tone="lilac" />
          </View>
        </View>

        <Card list>
          {menu.map((item) => (
            <MenuItemRow key={item.id} item={item} qty={cart.qty[item.id] ?? 0} onChange={(q) => cart.setQty(item.id, q)} />
          ))}
        </Card>

        <View className="gap-3">
          <Text className="text-section font-bold text-foreground">{t('menu.pickupSlot')}</Text>
          {everyFull ? (
            <Card>
              <Text className="text-emph text-foreground">{t('menu.allFull')}</Text>
              <ActionButton label={t('menu.anotherStall')} variant="secondary" onPress={() => router.back()} />
            </Card>
          ) : (
            <>
              <Text className="text-body text-muted">{cart.slotTime ? cart.slotTime : t('menu.pickupHint')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4" contentContainerClassName="px-4 gap-2">
                {SLOT_TIMES.map((time) => (
                  <SlotChip
                    key={time}
                    time={time}
                    left={slotsLeft(bookings, stall.id, time)}
                    selected={cart.slotTime === time}
                    onPress={() => onSlot(time)}
                  />
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </ScrollView>
      <CartBar
        count={count}
        total={total}
        ready={count > 0 && Boolean(cart.slotTime)}
        onCheckout={() => router.push('/customer/checkout' as Href)}
      />
      <SlotFullSheet
        visible={fullTime !== null}
        nextTime={fullTime ? nextAvailableSlot(bookings, stall.id, fullTime) : null}
        onPick={(time) => {
          cart.setSlot(time);
          setFullTime(null);
        }}
        onClose={() => setFullTime(null)}
      />
    </View>
  );
}
