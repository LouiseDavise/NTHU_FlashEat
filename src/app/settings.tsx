import { useRouter, type Href } from 'expo-router';
import { Alert, View, Text } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { AppHeader } from '@/components/app-header';
import { Card } from '@/components/card';
import { Segmented } from '@/components/segmented';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import type { Language } from '@/features/flasheat/types/flasheat';
import { useT } from '@/i18n/use-t';
import { useCartStore } from '@/features/flasheat/store/cart-store';

export default function SettingsScreen() {
  const { t, language } = useT();
  const router = useRouter();
  const setLanguage = useFlashEatStore((s) => s.setLanguage);
  const resetDemo = useFlashEatStore((s) => s.resetDemo);
  const clearCart = useCartStore((s) => s.clear);

  const askReset = () =>
    Alert.alert(t('settings.resetTitle'), t('settings.resetBody'), [
      { text: t('settings.cancel'), style: 'cancel' },
      {
        text: t('settings.resetConfirm'),
        style: 'destructive',
        onPress: () => {
          clearCart();
          resetDemo();
          if (router.canDismiss()) router.dismissAll();
          router.replace('/' as Href);
        },
      },
    ]);

  return (
    <View className="flex-1 bg-background">
      <AppHeader showBack hideControls />
      <View className="flex-1 gap-6 px-4 pt-6 pb-safe-offset-4">
        <Text accessibilityRole="header" className="text-title font-bold text-foreground">{t('settings.title')}</Text>
        <Card>
          <Text className="text-caption font-semibold text-muted">{t('settings.language')}</Text>
          <Segmented values={['en', 'zh'] as const} labels={['English', '繁體中文']} value={language as Language} onChange={setLanguage} />
        </Card>
        <ActionButton label={t('settings.reset')} variant="danger" onPress={askReset} />
        <Text className="text-caption text-muted">{t('settings.about')}</Text>
      </View>
    </View>
  );
}
