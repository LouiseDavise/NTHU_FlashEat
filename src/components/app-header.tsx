import { useRouter, type Href } from 'expo-router';
import { Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { LanguageToggle } from '@/components/language-toggle';
import { Pressable } from '@/components/pressable';
import { ReadyBanner } from '@/components/ready-banner';
import { DEMO_CLOCK } from '@/features/flasheat/data/seed';
import { useFlashEatStore } from '@/features/flasheat/store/flasheat-store';
import { useT } from '@/i18n/use-t';

interface AppHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  hideControls?: boolean;
}

export function AppHeader({ showBack, onBack, hideControls }: AppHeaderProps) {
  const { t } = useT();
  const router = useRouter();
  const role = useFlashEatStore((s) => s.session.role);
  const switchRole = useFlashEatStore((s) => s.switchRole);

  const onSwitch = () => {
    switchRole();
    if (router.canDismiss()) router.dismissAll();
    router.replace('/' as Href);
  };

  return (
    <View>
      <View className="bg-accent px-4 pb-3 pt-safe-offset-2 gap-1">
        <View className="min-h-11 flex-row items-center gap-3">
          <Text className="text-section font-bold text-accent-foreground">FlashEat</Text>
          <View className="rounded-full bg-pressed px-2 py-1">
            <Text className="text-caption font-semibold text-accent-foreground">{DEMO_CLOCK} {t('header.demo')}</Text>
          </View>
          <View className="flex-1" />
          <LanguageToggle />
          {hideControls ? null : (
            <Pressable
              onPress={() => router.push('/settings' as Href)}
              accessibilityRole="button"
              accessibilityLabel={t('header.settings')}
              className="size-11 items-center justify-center"
            >
              <Icon name="settings-outline" size={24} tone="white" />
            </Pressable>
          )}
        </View>
        {hideControls ? null : (
          <View className="min-h-11 flex-row items-center justify-between">
            {showBack ? (
              <Pressable
                onPress={() => (onBack ? onBack() : router.back())}
                accessibilityRole="button"
                accessibilityLabel={t('header.back')}
                className="min-h-11 flex-row items-center gap-1 pr-3"
              >
                <Icon name="arrow-back" size={22} tone="white" />
                <Text className="text-body font-semibold text-accent-foreground">{t('header.back')}</Text>
              </Pressable>
            ) : (
              <View />
            )}
            {role ? (
              <Pressable
                onPress={onSwitch}
                accessibilityRole="button"
                accessibilityLabel={t('header.switchRole')}
                className="min-h-11 flex-row items-center gap-2 rounded-full border border-accent-foreground px-3"
              >
                <Icon name="swap-horizontal" size={18} tone="white" />
                <Text className="text-caption font-semibold text-accent-foreground">{t('header.switchRole')}</Text>
              </Pressable>
            ) : null}
          </View>
        )}
      </View>
      {role === 'customer' ? <ReadyBanner /> : null}
    </View>
  );
}
