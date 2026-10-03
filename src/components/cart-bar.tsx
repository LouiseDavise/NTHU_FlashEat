import { Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { useT } from '@/i18n/use-t';

interface CartBarProps {
  count: number;
  total: number;
  ready: boolean;
  onCheckout: () => void;
}

export function CartBar({ count, total, ready, onCheckout }: CartBarProps) {
  const { t } = useT();
  return (
    <View className="flex-row items-center gap-4 border-t border-border bg-background px-4 pt-3 pb-safe-offset-2">
      <View className="flex-1">
        <Text className="text-caption text-muted">{count === 1 ? t('menu.item') : t('menu.items', { n: count })}</Text>
        <Text className="text-section font-bold text-foreground">NT${total}</Text>
      </View>
      <ActionButton label={t('menu.checkout')} onPress={onCheckout} disabled={!ready} className="min-w-36" />
    </View>
  );
}
