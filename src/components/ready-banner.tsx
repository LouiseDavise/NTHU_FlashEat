import { useRouter, usePathname, type Href } from 'expo-router';
import { Text, View } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useEffect } from 'react';
import { Presets } from 'react-native-pulsar';

import { Icon } from '@/components/icon';
import { Pressable } from '@/components/pressable';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import { useT } from '@/i18n/use-t';
import { durations, easings } from '@/lib/motion';

export function ReadyBanner() {
  const { t } = useT();
  const router = useRouter();
  const pathname = usePathname();
  const customer = useFlashEatStore((s) => s.session.customer);
  const order = useFlashEatStore((s) =>
    s.orders
      .filter((o) => o.status === 'Ready' && s.session.customer && o.customerName === s.session.customer.name)
      .sort((a, b) => b.createdAt - a.createdAt)[0],
  );
  const visible = Boolean(customer && order && !pathname.includes(order.id));

  useEffect(() => {
    if (visible) Presets.System.notificationSuccess();
  }, [visible]);

  if (!order || !visible) return null;
  return (
    <Animated.View
      entering={SlideInUp.duration(durations.gentle).easing(easings.enter)}
      exiting={SlideOutUp.duration(durations.fast).easing(easings.exit)}
    >
      <Pressable
        onPress={() => router.push(`/customer/order/${order.id}` as Href)}
        accessibilityRole="button"
        accessibilityLabel={t('order.banner', { spot: order.shelfSpot ?? '' })}
        className="min-h-14 flex-row items-center gap-3 bg-success px-4 py-3"
      >
        <Icon name="checkmark-circle" size={26} tone="white" />
        <View className="flex-1">
          <Text className="text-body font-semibold text-success-foreground">{t('order.banner', { spot: order.shelfSpot ?? '' })}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
