import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import type { OrderStatus } from '@/features/flasheat/types/flasheat';
import { STATUS_KEY, STATUS_STEPS } from '@/features/flasheat/utils/status';
import { useT } from '@/i18n/use-t';
import { cn } from '@/lib/cn';

interface OrderTrackerProps {
  status: OrderStatus;
}

export function OrderTracker({ status }: OrderTrackerProps) {
  const { t } = useT();
  const current = STATUS_STEPS.indexOf(status);
  return (
    <View>
      {STATUS_STEPS.map((step, i) => {
        const done = i < current || status === 'PickedUp';
        const active = i === current && status !== 'PickedUp';
        const last = i === STATUS_STEPS.length - 1;
        return (
          <View key={step} className="flex-row gap-3" accessibilityLabel={`${t(STATUS_KEY[step])}${done ? ' ✓' : ''}`}>
            <View className="items-center">
              <View className={cn('size-7 items-center justify-center rounded-full border-2', done || active ? 'border-accent bg-accent' : 'border-border bg-background')}>
                {done ? <Icon name="checkmark" size={16} tone="white" /> : active ? <View className="size-2 rounded-full bg-accent-foreground" /> : null}
              </View>
              {last ? null : <View className={cn('h-6 w-0.5', i < current ? 'bg-accent' : 'bg-border')} />}
            </View>
            <Text className={cn('pt-0.5 text-emph', active ? 'font-bold text-accent' : done ? 'font-semibold text-foreground' : 'text-muted')}>
              {t(STATUS_KEY[step])}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
