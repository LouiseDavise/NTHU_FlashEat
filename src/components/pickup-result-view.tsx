import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming,
} from 'react-native-reanimated';
import { Presets } from 'react-native-pulsar';

import { ActionButton } from '@/components/action-button';
import { Icon } from '@/components/icon';
import { MENU_ITEMS } from '@/features/flasheat/data/seed';
import type { PickupResult } from '@/features/flasheat/types/flasheat';
import { useNames, useT } from '@/i18n/use-t';
import { timing } from '@/lib/motion';
import { cn } from '@/lib/cn';

interface PickupResultViewProps {
  result: PickupResult;
  onNext: () => void;
}

const SURFACE = { verified: 'bg-success', invalid: 'bg-danger', already: 'bg-danger', notReady: 'bg-warning' } as const;
const TEXT = { verified: 'text-success-foreground', invalid: 'text-danger-foreground', already: 'text-danger-foreground', notReady: 'text-warning-foreground' } as const;

export function PickupResultView({ result, onNext }: PickupResultViewProps) {
  const { t } = useT();
  const nameOf = useNames();
  const kind = result.kind;
  const alarm = kind === 'invalid' || kind === 'already';
  const pop = useSharedValue(kind === 'verified' ? 0 : 1);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (kind === 'verified') {
      Presets.System.notificationSuccess();
      pop.set(withSequence(withTiming(1.15, timing.enter), withTiming(1, timing.move)));
      return;
    }
    if (alarm) {
      Presets.System.notificationError();
      pulse.set(withRepeat(withSequence(withTiming(0.55, timing.move), withTiming(1, timing.move)), -1));
      return;
    }
    Presets.System.notificationWarning();
  }, [kind, alarm, pop, pulse]);

  const popStyle = useAnimatedStyle(() => ({ transform: [{ scale: pop.get() }], opacity: pop.get() > 0 ? 1 : 0 }));
  const pulseStyle = useAnimatedStyle(() => ({ opacity: pulse.get() }));

  const title = kind === 'verified' ? t('pickup.verified') : kind === 'invalid' ? t('pickup.invalid') : kind === 'already' ? t('pickup.already') : t('pickup.notReady');
  const icon = kind === 'verified' ? 'checkmark-circle' : kind === 'notReady' ? 'time' : 'alert-circle';
  const order = result.kind === 'invalid' ? null : result.order;

  return (
    <Animated.View className={cn('flex-1 justify-between gap-6 px-4 pb-safe-offset-4 pt-8', SURFACE[kind])} style={alarm ? pulseStyle : undefined}>
      <View className="flex-1 items-center justify-center gap-6">
        <Animated.View style={kind === 'verified' ? popStyle : undefined}>
          <View className="size-32 items-center justify-center rounded-full bg-background">
            <Icon name={icon} size={88} tone={kind === 'verified' ? 'success' : kind === 'notReady' ? 'muted' : 'danger'} />
          </View>
        </Animated.View>
        <Text accessibilityRole="header" className={cn('text-center text-title font-bold', TEXT[kind])}>{title}</Text>
        {order ? (
          <View className="w-full gap-2 rounded-2xl bg-background p-4">
            <Text className="text-section font-bold text-foreground">{order.id}</Text>
            {order.items.map((l) => {
              const item = MENU_ITEMS.find((m) => m.id === l.menuItemId);
              return (
                <Text key={l.menuItemId} className="text-emph text-foreground">{l.qty}× {item ? nameOf(item).primary : ''}</Text>
              );
            })}
            {order.shelfSpot ? <Text className="text-body font-semibold text-accent">{t('pickup.shelf', { spot: order.shelfSpot })}</Text> : null}
          </View>
        ) : null}
      </View>
      <ActionButton label={t('pickup.next')} onPress={onNext} variant="secondary" />
    </Animated.View>
  );
}
